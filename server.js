const app = require('./app');
const http = require('http');
// eslint-disable-next-line no-undef
const port = process.argv[2] || 3000;
const server = http.createServer();
const mongoUtil = require('./db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');	


const config = require('./env/env');



mongoUtil.connectToServer((err) => {
	if (err) throw err;
	server.listen(port, config.ip, () => {
		console.log(server.address().address + ':' + server.address().port);
	});
	server.on('request', app);


	app.get('/', (req, res) => {
		res.send('<html><title>Node-mongo-boilerplate</title></html>');
	});
	const auth = require('./routes/auth');
	const wallet = require('./routes/wallet');
	const products = require('./routes/products');
	
	 app.use('/auth/', auth);
	 app.use('/wallet',wallet);
	app.use('/products',products);
})




// verifyAuthToken: (req, res, next) => {
// 	const authHeader =req.headers['authorization']
// 	const token = authHeader && authHeader.split(' ')[1]
// 	if (token == null) return res.sendStatus(401)

// 	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
// 	  console.log(err)
// 	  if (err) return res.sendStatus(402)
// 	  req.email = email
// 	  next()
// 	})
//   }