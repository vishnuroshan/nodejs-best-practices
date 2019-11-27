require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const buyLibrary = require('../library/buy-lib');
const db = require('../db/db').getDb();
const ex = {};

ex.buy = (query) => {
	const userId = query.userId;
	return new Promise((resolve, _reject) => {
		if (query.cartId) {
			const cartId = query.cartId;
			db.collection("carts").findOne({
				"userId": userId
			}, function (err, res) {
				if (err) throw err;
				db.collection("wallets").updateMany({
					userId: userId
				}, {
					$inc: {
						balance: -res.total
					}
				})
				db.collection("myOrders").insertOne(res, (error, result) => {
					if (error) throw error;
					console.log(result);
				});
				console.log("history");
				return resolve(res);

			});

		} else {
			const productname = req.query.productname;
			const productprice = req.query.productprice;
			const productstock = req.query.productstock;
			const sum = productstock * productprice;

			console.log(sum);
			db.collection("wallets").updateMany({
				userId: userId
			}, {
				$inc: {
					balance: -sum
				}
			})
			console.log("wallet updated")

			const temp = {
				"userId": userId,
				"productname": productname,
				" productprice": productprice,
				"productstock": productstock,
				"total": sum
			};

			db.collection("myOrders").insertOne(temp, function (error, result) {
				if (error)
					throw error;
				return resolve(result);
			})
		}
	})
}

module.exports = ex;