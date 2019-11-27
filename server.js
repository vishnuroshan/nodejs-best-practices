/* eslint-disable global-require */
const app = require('./app');
const http = require('http');
const port = process.argv[2] || 3000;
const server = http.createServer();
const mongoUtil = require('./db/db');
const jwt = require('jsonwebtoken');
const config = require('./env/env');

const verifyAuthToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
        console.log(err);
        if (err) return res.sendStatus(402);
        req.email = email;
        next();
    });
};

mongoUtil.connectToServer((err) => {
    if (err) throw err;
    server.listen(port, config.ip, () => {
        console.log(`http://${server.address().address}:${server.address().port}`);
    });
    server.on('request', app);

    app.get('/', (req, res) => {
        res.send('<html><title>Node-mongo-boilerplate</title></html>');
    });

    const auth = require('./routes/auth');
    const wallet = require('./routes/wallet');
    const products = require('./routes/products');
    const cart = require('./routes/cart');
    const buy = require('./routes/buy');
    const myOrders = require('./routes/myOrders');

    app.use('/auth/', auth);
    app.use(verifyAuthToken);
    app.use('/wallet/', wallet);
    app.use('/products/', products);
    app.use('/cart/', cart);
    app.use('/buy/', buy);
    app.use('/myOrders/', myOrders);
})