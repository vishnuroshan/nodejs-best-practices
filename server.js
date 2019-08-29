const app = require('express')();
const bodyParser = require('body-parser');
const port = process.argv[2] || process.env.PORT || 3000;
const server = require('http').createServer();
const mongoUtil = require('./dbconfig/db');
app.use(bodyParser.json({
    type: '*/*'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('cors'));
server.listen(port, function () {
    console.log(server.address().port);
});
server.on('request', app);
mongoUtil.connectToServer((err) => {
    if (err) throw err;
    else {
        app.get('/', function (req, res) {
            const db = mongoUtil.getDb();
            console.log(db);
            res.send('welcome to node and mongo boilerplate app');
        });
    }

});