const ex = {};
const authData = require('../data/auth-data');
ex.login = (username, password) => {
	return new Promise((resolve, reject) => {
		// do your buisness login here
		authData.login(username, password).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
};

module.exports = ex;