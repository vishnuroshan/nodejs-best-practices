require('dotenv').config();
const ex = {};
const authData = require('../data/auth-data');

ex.myOrders = (userId) => {
    return new Promise((resolve, reject) => {
        authData.myOrders(userId).then(result => {
            return resolve(result);
        }, err => {
            return reject(err);
        });
    });
};

module.exports = ex;
