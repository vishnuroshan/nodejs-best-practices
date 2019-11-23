const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const authLibrary = require('../library/auth-lib');
const jwt = require('jsonwebtoken');	


function generateAccessToken(email) {
	return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' })
  }	
  



router.post('/signup',bodyParser,(req,res) =>{
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	authLibrary.signup(username,email,password).then(isAuth => {

		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});

})




router.post('/login', bodyParser, (req, res) => {
	console.log(req.body);
	authLibrary.login(req.body.name, req.body.password).then(isAuth => {
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);

		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});
});



router.post('/resetpass', bodyParser, (req, res) => {
	console.log(req.body);
	authLibrary.resetpass(req.body.name,req.body.oldpass,req.body.newpass).then(isAuth => {
		
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});
});

module.exports = router;