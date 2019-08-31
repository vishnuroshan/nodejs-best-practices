const app = require('express')();
const http = require('http');
const port = process.argv[2] || 3000;
const server = http.createServer();
const cors = require('cors')
const mongoUtil = require('./dbconfig/db');
const ip = 'localhost';
server.listen(port, ip, function () {
    console.log(server.address().address + ':' + server.address().port);
});
app.use(cors());
app.disable('x-powered-by');
server.on('request', app);
mongoUtil.connectToServer((err) => {
    if (err) console.log(err);
    app.get('/', function (req, res) {
        res.send('working')
    });
})