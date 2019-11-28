require('dotenv').config()
const db = require('../db/db').getDb();
const ex = {};

ex.buy = (query) => {
	const userId = query.userId;
	return new Promise((resolve, reject) => {
		if (query.cartId) {
			db.collection("carts").findOne({
				"userId": userId
			}, function (err, res) {
				if (err) return reject(err);
				db.collection("wallets").updateMany({
					userId: userId
				}, {
					$inc: {
						balance: -res.total
					}
				})
				db.collection("myOrders").insertOne(res, (error, result) => {
					if(error) return reject(error)
					console.log(result);
				});
				console.log("history");
				return resolve(res);

			});

		} else {
			const productname = query.productname;
			const productprice = query.productprice;
			const productstock =query.productstock;
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
					return reject(error);
				return resolve(result);
			})
		}
	})
}

module.exports = ex;