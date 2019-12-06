require('dotenv').config()
const ex = {};
const productData = require('../data/product-data');

ex.addproduct = (productname, productprice, availablestock) => {
    return new Promise((resolve, reject) => {
        productData.addproduct(productname, productprice, availablestock).then(result => {
            return resolve(result);
        }, err => {
            return reject(err);
        });
    });
};

ex.listproducts = () => {
    return new Promise((resolve, reject) => {
        productData.listproducts().then(result => {
            return resolve(result);
        }, err => {
            return reject(err);
        });
    });
};

ex.removeproduct = (productname) => {
    return new Promise((resolve, reject) => {
        productData.removeproduct(productname).then(result => {
            return resolve(result);
        }, err => {
            return reject(err);
        });
    });
};

ex.checkstock = (productname) => {
    return new Promise((resolve, reject) => {
        productData.checkstock(productname).then(result => {
            return resolve(result);
        }, err => {
            return reject(err);
        });
    });
}

module.exports = ex;