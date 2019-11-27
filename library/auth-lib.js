require('dotenv').config()
const jwt = require('jsonwebtoken');
const ex = [];
const authData = require('../data/auth-data');
const bcrypt = require('bcryptjs');

function generateAccessToken(username) {
	return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
}

let refreshTokens = [];
ex.signup = (username, email, password) => {
	return new Promise((resolve, reject) => {
		const hash = bcrypt.hashSync(password, 10);
		authData.signup(username, email, hash).then(result => {
			console.log(hash);
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
};

ex.login = (username, password) => {
	return new Promise((resolve, _reject) => {
		authData.login(username, password).then(result => {
			console.log(result);
			if (bcrypt.compareSync(password, result)) {
				console.log("matched");
				let accesstoken = generateAccessToken(username)
				let refreshtoken = jwt.sign(username, process.env.REFRESH_TOKEN_SECRET)
				refreshTokens.push(refreshtoken)
				console.log("true");
				const token = {
					'accesstoken': accesstoken,
					'refreshtoken': refreshtoken
				}
				return resolve(token);
			} else {
				console.log("not matched");
			}
		})
	})
}

ex.resetpass = (username, oldpass, newpass) => {
	return new Promise((resolve, reject) => {
		authData.resetpass(username, oldpass, newpass).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
}

module.exports = ex;