require('dotenv').config();
const ex = {};
const cartData = require('../data/cart-data');

ex.addtocart = (userId, product) => {
    return new Promise((resolve, reject) => {
        cartData.addtocart(userId, product).then(result => {
            return resolve(result);
        }, err => {
            return reject(err);
        });
    });
};

ex.removefromcart = (userId, productname) => {
    return new Promise((resolve, reject) => {
        cartData.removefromcart(userId, productname).then(result => {
            return resolve(result);
        }, err => {
            return reject(err);
        })
    })
}

module.exports = ex;