require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cartLibrary = require('../library/cart-lib');
const db = require('../db/db').getDb();
const bodyParser = require('../middlewares/bodyParser');
const ex = {};


function productfunc(array, productname, value) {
	for (const arr of array) {
		if (arr[productname] === value) return arr;
	}
}

ex.addtocart = (userId, product) => {
	const k = product.length;
	console.log(k);
	let sum = 0;
	return new Promise((resolve, reject) => {
		for (let i = 0; i < k; i++) {
			db.collection("products").updateMany({
				productname: product[i].productname
			}, {
				$inc: {
					availablestock: -product[i].stock
				}
			});
			console.log(product[i].productname, "got updated")
			const m = product[i].stock * product[i].productprice;
			sum = sum + m;
		}
		const temp = {
			"userId": userId,
			"product": product,
			"total": sum
		};
		console.log(sum);
		db.collection("carts").insertOne(temp, function (error, result) {
			if (error) return reject(error);
			console.log("Data inserted to Carts");
			//return resolve(result);
			db.collection("carts").findOne({userId:userId},function(err,res){
				if(err) return reject(err);
				return resolve(res);
			})
		})
	})
}

ex.removefromcart = (userId, productname) => {
	return new Promise((resolve, reject) => {

		const key = {
			userId: userId
		};
		console.log(productname);
		const producttemp = productname;
		db.collection("carts").findOne(key, function (err, res) {
			if (err) return reject(err);
			
			const product = productfunc(res.product, "productname", producttemp);
			console.log(product.productprice);

			const price = product.productprice;
			const stock = product.stock;
			const tt = price * stock;

			console.log("minus-frm-total", tt);
			db.collection("carts").updateMany(key, {
				$inc: {
					total: -tt
				}
			});
		})

		const query = {
			$pull: {
				product: {
					productname: productname
				}
			}
		};
		db.collection("carts").updateMany(key, query, function (error, result) {
			if (error)
				return reject(error);
			//return resolve(result);
		})
		db.collection("carts").findOne({userId:userId},function(err,res){
			if(err) return reject(err);
			return resolve(res);
		})
	})
}

module.exports = ex;