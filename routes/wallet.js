const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const authLibrary = require('../library/auth-lib');





router.post('/createwallet',bodyParser,(req,res) =>{

console.log(req.body)
const userId = req.body.userId;
const email =  req.body.email;
const balance = req.body.balance
	authLibrary.createwallet(userId,email,balance).then(isAuth => {
		// do something
		console.log(isAuth);
		res.status(httpErrors.OK.statusCode).send(isAuth);
		
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});

})


router.get('/checkbalance', bodyParser,(req, res) => {
    console.log("checkbalance");
	
	authLibrary.checkbalance(req.params.email).then(isAuth => {
		console.log(req.params.email,isAuth);
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});
});



router.post('/addmoney',bodyParser,(req,res) => {
    console.log(req.body);
    authLibrary.addmoney(req.body.email,req.body.balance).then(isAuth => {
		// do something
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});



})

module.exports = router;