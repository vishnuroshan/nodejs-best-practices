const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const productLibrary = require('../library/product-lib');

router.post('/addproduct', bodyParser, (req, res) => {

    productLibrary.addproduct(req.body.productname, req.body.productprice, req.body.availablestock).then((added) => {
        console.log(added);
        res.status(httpErrors.CREATED.statusCode).send(added);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.BAD_REQUEST.statusCode).send(httpErrors.BAD_REQUEST);
    });

});


router.get('/listproducts', bodyParser, (_req, res) => {
    console.log('listproducts');

    productLibrary.listproducts().then((products) => {
        // do something
        res.status(httpErrors.Accepted.statusCode).send(products);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
    });
});

router.delete('/removeproduct/:productname', bodyParser, (req, res) => {
    console.log('removeproduct');

    productLibrary.removeproduct(req.params.productname).then((msg) => {
        // do something
        res.status(httpErrors.OK.statusCode).send(msg);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
    });
});

router.get('/checkstock/:productname', bodyParser, (req, res) => {
    console.log('checkstock');

    productLibrary.checkstock(req.params.productname).then((items) => {
        console.log(items);
        res.status(httpErrors.Accepted.statusCode).send(items);
    }, (error) => {
        console.log(error);
        res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);


    });

});


module.exports = router;