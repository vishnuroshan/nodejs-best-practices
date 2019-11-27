const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const authLibrary = require('../library/auth-lib');

router.post('/addproduct', bodyParser, (req, res) => {

    console.log(req.body);
    // const productname = req.body.productname;
    // const productprice = req.body.productprice;
    // const availablestock = req.body.availablestock;

    authLibrary.createwallet(req.body.productname, req.body.productprice, req.body.availablestock).then((added) => {
        console.log(added);
        res.status(httpErrors.OK.statusCode).send(added);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
    });

});


router.get('/listproducts', bodyParser, (_req, res) => {
    console.log('listproducts');

    authLibrary.listproducts().then((products) => {
        // do something
        res.status(httpErrors.OK.statusCode).send(products);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
    });
});

router.delete('/removeproduct', bodyParser, (req, res) => {
    console.log('removeproduct');

    authLibrary.removeproduct(req.params.productname).then((msg) => {
        // do something
        res.status(httpErrors.OK.statusCode).send(msg);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
    });
});

router.get('/checkstock', bodyParser, (req, res) => {
    console.log('checkstock');

    authLibrary.checkstock(req.params.productname).then((items) => {
        console.log(items);
        res.status(httpErrors.OK.statusCode).send(items);
    }, (error) => {
        console.log(error);
        res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);


    });

});


module.exports = router;