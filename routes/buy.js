const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const buyLibrary = require('../library/buy-lib');

router.post('/buy', bodyParser, (req, res) => {
    console.log(req.body);
    const query = req.body;

    buyLibrary.buy(query).then((data) => {
        res.status(httpErrors.OK.statusCode).send(data);
    }, (error) => {
        console.log(error);
        res.status(httpErrors.BAD_REQUEST.statusCode).send(httpErrors.BAD_REQUEST);
    });

});

module.exports = router;