require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const walletLibrary = require('../library/wallet-lib');
const db = require('../db/db').getDb();
const bodyParser = require('../middlewares/bodyParser');
const ex = {};

ex.createwallet = (userId, email, balance) => {
	const t = {
		userId,
		email,
		balance
	}
	return new Promise((resolve, _reject) => {
		db.collection("wallets").insertOne(t, function (err, _res) {
			if (err) throw err;
			return resolve(t);
		});
		// do something and return the data in resolve
	});
};

ex.checkbalance = (email) => {
	console.log(email);
	return new Promise((resolve, _reject) => {
		db.collection("wallets").findOne({
			email: email
		}, function (err, res) {
			if (err) throw err;
			console.log(res);
			return resolve(res);
		})
	})
}

ex.addmoney = (email, balance) => {
	console.log(email);
	console.log(balance);
	return new Promise((resolve, _reject) => {
		db.collection("wallets").updateOne({
			"email": email
		}, {
			$inc: {
				"balance": balance
			}
		}, {
			upsert: true,
			safe: false
		}, function (error, _result) {
			if (error)
				throw error;
			db.collection('wallets').find({
				"email": email
			}).toArray(function (error, result) {
				if (error)
					throw error;
				console.log(result);
				return resolve(result);
			});
		})
	})
}



module.exports = ex;