const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const authLibrary = require('../library/auth-lib');

router.post('/signup', bodyParser, (req, res) => {
    
    authLibrary.signup(req.body.username, req.body.email, req.body.password).then((isAuth) => {
        // do something
        res.status(httpErrors.OK.statusCode).send(isAuth);
        console.log(isAuth);
    }, (error) => { 
        console.log(error);
        // do something with the error here
        res.status(httpErrors.BAD_REQUEST.statusCode).send(httpErrors.BAD_REQUEST);
    });

});

router.post('/login', bodyParser, (req, res) => {
    // console.log(req.body);
    authLibrary.login(req.body.username, req.body.password).then((isAuth) => {
        // do something
        res.status(httpErrors.OK.statusCode).send(isAuth);
        // console.log(isAuth);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
    });
});



router.post('/resetpass', bodyParser, (req, res) => {
    console.log(req.body);
    authLibrary.resetpass(req.body.username, req.body.oldpass, req.body.newpass).then((msg) => {
        // do something
        res.status(httpErrors.OK.statusCode).send(msg);
    }, (error) => {
        console.log(error);
        // do something with the error here
        res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
    });
});

module.exports = router;