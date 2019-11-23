require('dotenv').config()
const jwt = require('jsonwebtoken');	
const bcrypt = require('bcryptjs');
const authLibrary = require('../library/auth-lib');
const db = require('../db/db').getDb();
const bodyParser = require('../middlewares/bodyParser');

function generateAccessToken(email) {
	return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
  }

let refreshTokens = []
const ex = {};


ex.signup = (username,email, hash) => {
const temp = {username,email,hash};
		return new Promise((resolve, reject) => {
		db.collection("Users").insertOne(temp, function(err, document) {
			if(err) throw err;
			console.log(username, email);
			console.log("Account created!!!");
			
		});
		
	});
};




ex.login = (name, password) => {
	return new Promise((resolve, reject) => {
		console.log(password);

		db.collection("Users").find({name},function(err,res) {
			if(err) throw err
           bcrypt.compare(password,res.password);

	
			const accesstoken = generateAccessToken(name)
              const refreshtoken = jwt.sign(name, process.env.REFRESH_TOKEN_SECRET)
              refreshTokens.push(refreshtoken)
              console.log("true");
          
	console.log({ accessToken: accesstoken, refreshToken: refreshtoken });
});
})
};


ex.resetpass = (name, oldpass, newpass) => {
	return new Promise((resolve, reject) => {

		db.collection("Users").find({name},function(err,res) {
			if (err) throw err;

			if(bcrypt.compare(oldpass, name.password)){

			
			 const hash1 = bcrypt.hashSync(newpass, 10);
			 db.collection("users").updateOne(key,newvalues, function(err,res){
				if(err) throw err;
				console.log("document updated");
			})
		} else{
			res.send("password not matched");
		}
		})
	});
};

module.exports = ex;
