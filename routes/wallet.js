const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const walletLibrary = require('../library/wallet-lib');

router.post('/createwallet', bodyParser, (req, res) => {

    console.log(req.body);

    walletLibrary.createwallet(req.body.userId, req.body.email, req.body.balance).then((data) => {
        // do something
        console.log(isAuth);
        res.status(httpErrors.OK.statusCode).send(data);

    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.BAD_REQUEST.statusCode).send(httpErrors.BAD_REQUEST);
    });

});


router.get('/checkbalance/:email', bodyParser, (req, res) => {
    console.log('checkbalance');
    console.log(req.params.email);
    walletLibrary.checkbalance(req.params.email).then((data) => {
        console.log(req.params.email);
        res.status(httpErrors.Accepted.statusCode).send(data);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
    });
});


router.post('/addmoney', bodyParser, (req, res) => {
    console.log(req.body);
    walletLibrary.addmoney(req.body.email, req.body.balance).then((balance) => {
        // do something
        res.status(httpErrors.OK.statusCode).send(balance);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
    });
});

module.exports = router;