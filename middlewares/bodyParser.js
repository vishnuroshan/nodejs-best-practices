const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ type: '*/*' });
module.exports = jsonParser;