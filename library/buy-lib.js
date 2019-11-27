require('dotenv').config()
const ex = {};
const buyData = require('../data/buy-data');

ex.buy = (query) => {
	return new Promise((resolve, reject) => {
		buyData.buy(query).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		})
	})
}

module.exports = ex;