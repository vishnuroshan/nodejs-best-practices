require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authLibrary = require('../library/auth-lib');
const db = require('../db/db').getDb();
const bodyParser = require('../middlewares/bodyParser');
const ex = {};

ex.signup = (username, email, hash) => {
	const temp = {
		username,
		email,
		hash
	};
	return new Promise((resolve, _reject) => {
		db.collection("Users").insertOne(temp, function (err, document) {
			if (err) throw err;
			const t = {
				username: username,
				email: email
			}
			return resolve(t);
		});
	});
};

ex.login = (username, password) => {
	return new Promise((resolve, _reject) => {
		//console.log(password);
		db.collection("Users").findOne({
			username: username
		}, function (err, res) {
			if (err) {
				console.log("hlo", err);
				throw err
			}
			return resolve(res.hash);
		})
	})
}

ex.resetpass = (username, oldpass, newpass) => {
	return new Promise((resolve, _reject) => {

		db.collection("Users").findOne({
			username: username
		}, function (err, res) {
			console.log(res);
			if (err) throw err;
			console.log(res);
			if (bcrypt.compareSync(oldpass, res.hash)) {
				console.log("matched");
				const hash1 = bcrypt.hashSync(newpass, 10);
				console.log(hash1);
				const user = {
					username: username
				};
				const newval = {
					$set: {
						hash: hash1
					}
				};
				db.collection("Users").updateOne(user, newval, function (err, res) {
					if (err) throw err;
					console.log("document updated");
					return resolve("Password Updated");
				})
			} else {
				console.log("not matched");
			}
		});
	})
}

module.exports = ex;