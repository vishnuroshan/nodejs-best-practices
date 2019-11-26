const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const authLibrary = require('../library/auth-lib');



router.get('/myOrders', bodyParser,(req, res) => {
    console.log("MyOrders");
    const userId = req.query.userId
	
	authLibrary.myOrders(userId).then(isAuth => {
		// do something
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});
});


module.exports = router;