require('dotenv').config()
const jwt = require('jsonwebtoken');	


const ex = {};
const bodyParser = require('../middlewares/bodyParser');

const authData = require('../data/auth-data');
const bcrypt = require('bcryptjs');



ex.signup = (username,email,password) => {
	return new Promise((resolve,reject) => {
		
		const hash = bcrypt.hashSync(password, 10);
		//console.log(hash);
		authData.signup(username,email,hash).then(result => {
			return resolve(username); 
			
		}, err => {
			return reject(err);
		});
	});

};

ex.login = (name, password) => {
	return new Promise((resolve, reject) => {
			console.log("logged in");
		authData.login(name, password).then(

		function(samePassword) {
			if(!samePassword) {
				res.status(403).send();
			}
			res.send([accesstoken,refreshTokens]);
		}
	)
		.catch(function(error){
			console.log("Error authenticating user: ");
			console.log(error);
			
			console.log([accesstoken,refreshTokens]);

			return resolve("hlo");
		}, err => {
			return reject(err);
		})
	})
}

ex.resetpass = (name, oldpass,newpass) => {
	return new Promise((resolve, reject) => {
		//logic
		authData.resetpass(username, oldpass,newpass).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
}

module.exports = ex;