const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const cartLibrary = require('../library/cart-lib');





router.post('/addtocart', bodyParser, (req, res) => {

	console.log(req.body)
	const userId = req.body.userId;
	const product = req.body.product;
	cartLibrary.addtocart(userId, product).then(Data => {
		// do something
		res.status(httpErrors.OK.statusCode).send(Data);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
	});

})
router.post("/removefromcart",bodyParser,(req,res) => {
	cartLibrary.removefromcart(req.body.userId,req.body.productname).then(msg => {

		res.status(httpErrors.OK.statusCode).send(msg);
	}, error => {
		// do something with the error here
		res.status(httpErrors.INTERNAL_SERVER_ERROR.statusCode).send(httpErrors.INTERNAL_SERVER_ERROR);
	});

	
})


module.exports = router;