const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const cartLibrary = require('../library/cart-lib');





router.post('/addtocart', bodyParser, (req, res) => {

	console.log(req.body)
	const userId = req.body.userId;
	const product = req.body.product;
	cartLibrary.addtocart(userId, product).then(isAuth => {
		// do something
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
	});

})

router.delete('/removeproduct', bodyParser, (req, res) => {
	console.log("removeproducts");

	cartLibrary.removeproduct(req.params.productname).then(msg => {
		// do something
		res.status(httpErrors.OK.statusCode).send(msg);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
	});
});

router.get('/checkstock/:productname', bodyParser, (req, res) => {
	console.log("checkstock");

	cartLibrary.checkstock(req.params.productname).then(data => {
		res.status(httpErrors.OK.statusCode).send(data);
	}, error => {
		console.log(error);
		res.status(httpErrors.BAD_REQUEST.statusCode).send(httpErrors.BAD_REQUEST);
	});
});

module.exports = router;