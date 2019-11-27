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
	return new Promise((resolve, reject) => {
		db.collection("Users").insertOne(temp, function (err, document) {
			if (err) throw err;
			return resolve(username, email);
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
				throw err
			};
			//console.log(res.hash);
			return resolve(res.hash);
		})
	})
}

ex.resetpass = (username, oldpass, newpass) => {
	return new Promise((resolve, reject) => {

		db.collection("Users").findOne({
			username: username
		}, function (err, res) {
			if (err) throw err;
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
					return resolve(res);
				})
			} else {
				console.log("not matched");
			}
		});
	})
}

ex.createwallet = (userId, email, balance) => {
	const t = {
		userId,
		email,
		balance
	}
	return new Promise((resolve, reject) => {
		db.collection("wallets").insertOne(t, function (err, res) {
			if (err) throw err;
			return resolve(t);
		});
		// do something and return the data in resolve
	});
};

ex.checkbalance = (email) => {
	return new Promise((resolve, reject) => {
		db.collection("wallets").findOne({
			"email": email
		}, function (err, res) {
			if (err) throw err;
			return resolve(res.balance);
		})
	})
}

ex.addmoney = (email, balance) => {
	console.log(email);
	console.log(balance);

	return new Promise((resolve, reject) => {
		db.collection("wallets").updateOne({
			"email": email
		}, {
			$inc: {
				"balance": balance
			}
		}, {
			upsert: true,
			safe: false
		}, function (error, result) {
			if (error)
				throw error;
			db.collection('wallets').find({
				"email": email
			}).toArray(function (error, result) {
				if (error)
					throw error;
				console.log(result);
				return resolve(result);
			});
		})
	})
}

ex.addproduct = (productname, productprice, availablestock) => {
	const t = {
		productname,
		productprice,
		availablestock
	}
	return new Promise((resolve, reject) => {
		db.collection("products").insertOne(t, function (err, res) {
			if (err) throw reject;
			return resolve(t);
		});
		// do something and return the data in resolve
	});
};

ex.listproducts = () => {
	return new Promise((resolve, reject) => {
		db.collection('products').find({}).toArray(function (err, res) {
			if (err) throw err;
			return resolve(res);
		})
	})
}

ex.removeproduct = (productname) => {
	const query = {
		productname: productname
	}
	return new Promise((resolve, reject) => {
		db.collection('products').deleteOne(query, function (err, res) {
			if (err) throw err;
			console.log(res.result);
			return resolve(res.result);
		})
	})
}

ex.addtocart = (userId, product) => {
	const k = product.length;
	console.log(k);
	let sum = 0;
	return new Promise((resolve, reject) => {
		for (let i = 0; i < k; i++) {
			db.collection("products").updateMany({
				productname: product[i].productname
			}, {
				$inc: {
					availablestock: -product[i].stock
				}
			});
			console.log(product[i].productname, "got updated")
			const m = product[i].stock * product[i].productprice;
			sum = sum + m;
		}
		const temp = {
			"userId": userId,
			"product": product,
			"total": sum
		};
		console.log(sum);
		db.collection("carts").insertOne(temp, function (error, result) {
			if (error) throw error;
			console.log("Data inserted to Carts");
			return resolve(result);
		})
	})
}

ex.removefromcart = (userId, productname) => {
	return new Promise((resolve, reject) => {

		const key = {
			userId: userId
		};

		console.log(productname);
		const producttemp = productname;
		db.collection("carts").findOne(key, function (err, res) {
			if (err) throw err;

			function productname(array, productname, value) {
				for (const arr of array) {
					if (arr[productname] === value) return arr;
				}

				// 		for (const i = 0; i < array.length; i++) {
				// 			if (array[i][productname] === value) {
				// 				return array[i];
				// 	}
				// }
			}
			const product = productname(res.product, "productname", producttemp);
			console.log(product.productprice);


			const price = product.productprice;
			const stock = product.stock;
			const tt = price * stock;


			console.log("minus-frm-total", tt);
			db.collection("carts").updateMany(key, {
				$inc: {
					total: -tt
				}
			});
			//	return resolve(res);


		})


		const query = {
			$pull: {
				product: {
					productname: productname
				}
			}
		};

		db.collection("carts").updateMany(key, query, function (error, result) {
			if (error)
				throw error;
			return resolve(result);
		})
	})
}

ex.buy = (query) => {
	const userId = query.userId;
	return new Promise((resolve, reject) => {
		if (query.cartId) {
			const cartId = query.cartId;
			db.collection("carts").findOne({
				"userId": userId
			}, function (err, res) {
				if (err) throw err;
				db.collection("wallets").updateMany({
					userId: userId
				}, {
					$inc: {
						balance: -res.total
					}
				})
				db.collection("myOrders").insertOne(res, (error, result) => {
					if (error) throw error;
					console.log(result);
				})
				console.log("history");
				return resolve(res)

			});

		} else {
			const productname = req.query.productname;
			const productprice = req.query.productprice;
			const productstock = req.query.productstock;

			const sum = productstock * productprice;
			console.log(sum);
			db.collection("wallets").updateMany({
				userId: userId
			}, {
				$inc: {
					balance: -sum
				}
			})
			console.log("wallet updated")

			const temp = {
				"userId": userId,
				"productname": productname,
				" productprice": productprice,
				"productstock": productstock,
				"total": sum
			};

			db.collection("myOrders").insertOne(temp, function (error, result) {

				if (error)

					throw error;


				return resolve(result);
			})

		}
	})
}


ex.myOrders = (userId) => {
	return new Promise((resolve, reject) => {
		db.collection('myOrders').find({
			"$oid": userId
		}).toArray(function (err, res) {
			if (err) throw err;
			return resolve(res);
		})
	})
}



module.exports = ex;