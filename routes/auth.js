const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const authLibrary = require('../library/auth-lib');
router.post('/login', bodyParser, (req, res) => {
	console.log(req.body);
	authLibrary.login(req.body.username, req.body.password).then(isAuth => {
		// do something
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});
});

module.exports = router;