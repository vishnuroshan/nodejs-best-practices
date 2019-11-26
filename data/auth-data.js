require('dotenv').config()
const jwt = require('jsonwebtoken');	
const bcrypt = require('bcryptjs');
const authLibrary = require('../library/auth-lib');

let refreshTokens = []

const db = require('../db/db').getDb();
const bodyParser = require('../middlewares/bodyParser');





const ex = {};

ex.signup = (username,email, hash) => {

const temp = {username,email,hash};

//console.log(temp);
	//console.log("data server");
	
	
	return new Promise((resolve, reject) => {
		db.collection("Users").insertOne(temp, function(err, document) {
			if(err) throw err;
			console.log(username, email);
			console.log("Account created!!!");
			return resolve();
			
		});
		
	});
};




ex.login = (username, password) => {
	return new Promise((resolve, reject) => {
		//console.log(password);	
		db.collection("Users").findOne({username: username},function(err,res) {
			
			if(err) 
			 { console.log("hlo",err);
				 throw err};
			console.log(res.hash);
			return resolve(res.hash);			
		})
	})
}


ex.resetpass = (username, oldpass, newpass) => {
	return new Promise((resolve, reject) => {

		db.collection("Users").findOne({username: username},function(err,res) {
			if (err) throw err;
			if(bcrypt.compareSync(oldpass,res.hash))
			{
				console.log("matched");
				const newval = { $set:{password : newpass}  };
				db.collection("Users").updateOne({username: username},newval, function(err,res){
					if(err) throw err;
					console.log("document updated");
					return resolve(res);
				})
			}
			else{
				console.log("not matched");
			}
	});
})
}

ex.createwallet = (userId, email,balance) => {
	const t = {userId,email,balance}
	return new Promise((resolve, reject) => {
		db.collection("wallets").insertOne({t},function(err,res){
			if(err) throw err;
			return resolve(t);
		});
		// do something and return the data in resolve
	});
};

ex.checkbalance = (email) => {
	return new Promise ((resolve,reject) => {
		db.collection("wallets").findOne({"email" : email},function(err,res){
			if(err) throw err;
			return resolve(res.balance);
		})
	})
}

ex.addmoney = (email,balance) => {
	console.log(email);
	console.log(balance);

	return new Promise((resolve,reject) => {
		db.collection("wallets").updateOne({"email" : email}, {$inc: {"balance": balance}},{upsert: true, safe: false} ,function(error,result) {
			if(error)
			throw error;		
			db.collection('wallets').find({"email": email }).toArray(function(error,result){
				if(error)
				throw error;
				console.log(result);
				return resolve(result);
				});
		} )
	})
}


ex.addproduct = (productname,productprice,availablestock) => {
	const t = {productname,productprice,availablestock}
	return new Promise((resolve, reject) => {
		db.collection("products").insertOne(t,function(err,res){
			if(err) throw reject;
			return resolve(t);
		});
		// do something and return the data in resolve
	});
};



ex.listproducts = () => {
	return new Promise ((resolve,reject) => {
		db.collection('products').find({}).toArray(function(err,res){
			if(err) throw err;
			return resolve(res);
		})
	})
}

ex.removeproduct = (productname) => {
	const query = {productname: productname}
	return new Promise ((resolve,reject)=>{
		db.collection('products').deleteOne(query,function(err,res){
			if(err) throw err;
			console.log(res);
			return resolve(res);
		})
	})
}

ex.checkstock = (productname) => {
	const q = {productname: productname};
	return new Promise ((resolve,reject) => {
		db.collection('products').find(q,function(err,res){
			if(err) throw err;
			console.log(res.result);
			return resolve(res);
		})
	})
}



ex.removefromcart = (key,query) => {
	
	return new Promise ((resolve,reject) => {
		db.collection("carts").update(key,query,function(error,result){
            if(error)
           throw error;
         console.log(result);
        })
		})
	}



module.exports = ex;
