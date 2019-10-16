const app = require('express')();
const cors = require('cors');
app.use(cors());
app.disable('x-powered-by');
module.exports = app;