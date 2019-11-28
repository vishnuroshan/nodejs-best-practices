require('dotenv').config();
const ex = {};
const myOrders = require('../data/myOrders-data');

ex.myOrders = (userId) => {
    return new Promise((resolve, reject) => {
        myOrders.myOrders(userId).then(result => {
            return resolve(result);
        }, err => {
            return reject(err);
        });
    });
};

module.exports = ex;
