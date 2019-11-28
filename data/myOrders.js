require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authLibrary = require('../library/auth-lib');
const db = require('../db/db').getDb();
const bodyParser = require('../middlewares/bodyParser');
const ex = {};

ex.myOrders = (userId) => {
	return new Promise((resolve, reject) => {
		db.collection('myOrders').find({
			"$oid": userId
		}).toArray(function (err, res) {
			if (err) return reject(err);
			return resolve(res);
		})
	})
}

module.exports = ex;