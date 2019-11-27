require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const productLibrary = require('../library/product-lib');
const db = require('../db/db').getDb();
const bodyParser = require('../middlewares/bodyParser');
const ex = {};

ex.addproduct = (productname, productprice, availablestock) => {
	const t = {
		productname,
		productprice,
		availablestock
	}
	return new Promise((resolve, _reject) => {
		db.collection("products").insertOne(t, function (err, res) {
			if (err) throw err;
			return resolve(t);
		});
	});
};

ex.listproducts = () => {
	return new Promise((resolve, _reject) => {
		db.collection('products').find({}).toArray(function (err, res) {
			if (err) throw err;
			return resolve(res);
		})
	})
}

ex.removeproduct = (productname) => {
	const query = {
		productname: productname
	}
	return new Promise((resolve, _reject) => {
		db.collection('products').deleteOne(query, function (err, res) {
			if (err) throw err;
			console.log(res.result);
			return resolve(res.result);
		})
	})
}


module.exports = ex;