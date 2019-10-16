/* eslint-disable no-undef */
const DEV = require('./env.dev');
const PROD = require('./env.prod');
if (process.env.NODE_ENV === 'development')
	module.exports = DEV;
else module.exports = PROD;
