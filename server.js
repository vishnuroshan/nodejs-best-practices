const app = require('./app');
const http = require('http');
// eslint-disable-next-line no-undef
const port = process.argv[2] || 3000;
const server = http.createServer();
const mongoUtil = require('./db/db');
const config = require('./env/env');
const auth = require('./routes/auth');
server.listen(port, config.ip, () => {
	console.log(server.address().address + ':' + server.address().port);
});
server.on('request', app);
mongoUtil.connectToServer((err) => {
	if (err) console.log(err);
	app.get('/', (req, res) => {
		res.send('<html><title>Node-mongo-boilerplate</title></html>');
	});
	app.use('/auth/', auth);
});