// add the parent folder to .gitignore when going production for security reasons
module.exports = {
    // example connection string with username and password: mongodb://username:password@localhost:27017/.
    // https://docs.mongodb.com/manual/reference/connection-string/
    url: 'mongodb://localhost:27017/',
    // db name
    dbname: 'pmod'
}