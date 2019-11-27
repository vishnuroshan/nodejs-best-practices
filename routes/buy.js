const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const authLibrary = require('../library/auth-lib');

router.get('/buy', bodyParser, (req, res) => {
    console.log(req.query);
    const query = req.query;

    authLibrary.get(query).then((data) => {

        // would be better if mesage was sent
        res.status(httpErrors.OK.statusCode).send(data);
    }, (error) => {
        console.log(error);
        res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
    });

});

module.exports = router;