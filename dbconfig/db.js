const config = require('../config/config');
const MongoClient = require('mongodb').MongoClient;
let _db;
module.exports = {
    connectToServer: async function (callback) {
        await MongoClient.connect(config.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            function (err, client) {
                _db = client.db(config.dbname);
                return callback(err);
            });
    },
    // use this function in any routes to get the db
    getDb: function () {
        return _db;
    }
};