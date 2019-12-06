require('dotenv').config()
const ex = {};
const walletData = require('../data/wallet-data');

ex.createwallet = (userId, email, balance) => {
	return new Promise((resolve, reject) => {
		walletData.createwallet(userId, email, balance).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
};

ex.checkbalance = (email) => {
	return new Promise((resolve, reject) => {
		walletData.checkbalance(email).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
};

ex.addmoney = (email, balance) => {
	return new Promise((resolve, reject) => {
		walletData.addmoney(email, balance).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	})
}

module.exports = ex;