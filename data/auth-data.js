require('dotenv').config()
const bcrypt = require('bcryptjs');
const db = require('../db/db').getDb();
const ex = {};

ex.signup = (username, email, hash) => {
	const temp = {
		username,
		email,
		hash
	};
	return new Promise((resolve, _reject) => {
		db.collection("Users").insertOne(temp, function (err, document) {
			if (err) return reject(err);
			const t = {
				username: username,
				email: email
			}
			return resolve(t);
		});
	});
};

ex.login = (username, password) => {
	return new Promise((resolve, reject) => {
		//console.log(password);
		db.collection("Users").findOne({
			username: username
		}, function (err, res) {
			if (err) {
				console.log("hlo", err);
				return reject(err);
			}
			return resolve(res.hash);
		})
	})
}

ex.resetpass = (username, oldpass, newpass) => {
	return new Promise((resolve, reject) => {

		db.collection("Users").findOne({
			username: username
		}, function (err, res) {
			console.log(res);
			if (err) return reject(err);
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
					if (err) return reject(err);
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