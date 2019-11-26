require('dotenv').config()
const jwt = require('jsonwebtoken');
const ex = {};
const bodyParser = require('../middlewares/bodyParser');
const authData = require('../data/auth-data');
const bcrypt = require('bcryptjs');

function generateAccessToken(username) {
	return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
}

ex.signup = (username,email,password) => {
	return new Promise((resolve,reject) => {
		const hash = bcrypt.hashSync(password, 10);
		console.log(hash);
		authData.signup(username,email,hash).then(result => {
			console.log(hash);
			return resolve("from library"); 
		}, err => {
			return reject(err);
		});
	});
};

ex.login = (username, password) => {
	return new Promise((resolve, reject) => {
		authData.login(username,password).then(result => {
				console.log(result);
			if(bcrypt.compareSync(password,result))
			{
				console.log("matched");
				let accesstoken = generateAccessToken(username)
                let refreshtoken = jwt.sign(username, process.env.REFRESH_TOKEN_SECRET)
         		    refreshTokens.push(refreshtoken)
 					console.log("true");			
					return resolve(refreshToken,accesstoken);
			} else {
				console.log("not matched");
			}
	 	})
	 })
	}
	
	

ex.resetpass = (username, oldpass,newpass) => {
	return new Promise((resolve, reject) => {
		authData.resetpass(username, oldpass,newpass).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
}


ex.createwallet = (userId,email,balance) => {
	return new Promise((resolve, reject) => {
		authData.createwallet(userId, email,balance).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
};

ex.checkbalance = (email) => {
	return new Promise((resolve,reject) => {
		authData.checkbalance(email).then(result => {
			return resolve(result);
		},err => {
			return reject(err);
		});
	});
};

ex.addmoney = (email,balance) => {
	return new Promise((resolve,reject) => {
		authData.addmoney(email,balance).then(result => {
			return resolve(result);
		},err => {
			return reject(err);
		});
	})
}



ex.addproduct = (productname,productprice,availablestock) => {
	return new Promise((resolve, reject) => {
		authData.addproduct(productname,productprice,availablestock).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
};


ex.listproducts = () => {
	return new Promise((resolve,reject) => {
		authData.listproducts().then(result => {
			return resolve(result);

		},err => {
			return reject(err);
		});
	});
};



ex.removeproduct = (productname) => {
	return new Promise((resolve,reject) => {
		authData.removeproduct(productname).then(result => {
			return resolve(result);
		},err => {
			return reject(err);
		});
	});
};

ex.checkstock = (productname) => {
	return new Promise((resolve,reject) => {
		authData.checkstock(productname).then(result => {
			return resolve(result);
		},err => {
			return reject(err);
		});
	});
}



ex.addtocart = (userId,product) => {
	return new Promise((resolve, reject) => {
	authData.addtocart(userId,product).then(result => {
			return resolve(result);
		}, err => {
			return reject(err);
		});
	});
};


ex.removefromcart = (userId,product) => {
	return new Promise((resolve,reject) => {
		authData.removefromcart(userId,product).then(result => {
			return resolve(result);
		},err =>{ 
			return reject(err);
		})
	})
}

ex.buy = (query) => {
	return new Promise((resolve,reject) => {
		authData.buy(query).then(result => {
			return resolve(result);
		},err => {
			return reject(err);
		})
	})
}

ex.myOrders = (userId) => {
	return new Promise((resolve,reject) => {
		authData.myOrders(userId).then(result => {
			return resolve(result);
		},err => {
			return reject(err);
		});
	});
};


module.exports = ex;