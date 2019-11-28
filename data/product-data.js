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
	return new Promise((resolve, reject) => {
		db.collection("products").insertOne(t, function (err, res) {
			if (err) return reject(err);
			return resolve(t);
		});
	});
};

ex.listproducts = () => {
	return new Promise((resolve, reject) => {
		db.collection('products').find({}).toArray(function (err, res) {
			if (err) return reject(err);
			return resolve(res);
		})
	})
}

ex.removeproduct = (productname) => {
	const query = {
		productname: productname
	}
	return new Promise((resolve, reject) => {
		db.collection('products').deleteOne(query, function (err, res) {
			if (err) return reject(err);
			console.log(res.result);
			return resolve(res.result);
		})
	})
}

ex.checkstock = (productname) => {
	const query = {
		productname: productname
	}
	return new Promise((resolve, reject) => {
		db.collection('products').findOne(query, function (err, res) {
			if (err) return reject(err);
			//console.log(res);
			return resolve(res);
		});
	});
};


module.exports = ex;