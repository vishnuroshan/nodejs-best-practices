const router = require('express').Router();
const bodyParser = require('../middlewares/bodyParser');
const httpErrors = require('../utils/httpErrors');
const authLibrary = require('../library/auth-lib');





router.post('/addproduct',bodyParser,(req,res) =>{

console.log(req.body)
const productname = req.body.productname;
const productprice =  req.body.productprice;
const availablestock = req.body.availablestock;
	authLibrary.createwallet(productname,productprice,availablestock).then(isAuth => {
		console.log(isAuth);
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});

})


router.get('/listproducts', bodyParser,(req, res) => {
    console.log("listproducts");
	
	authLibrary.listproducts().then(isAuth => {
		// do something
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});
});

router.delete('/removeproduct',bodyParser,(req, res) => {
    console.log("removeproducts");
	
	authLibrary.removeproduct(req.params.productname).then(isAuth => {
		// do something
		res.status(httpErrors.OK.statusCode).send(isAuth);
	}, error => {
		console.log(error);
		// do something with the error here
		res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);
	});
});

router.get('/checkstock',bodyParser,(req,res)=> {
    console.log("checkstock");

    authLibrary.checkstock(req.params.productname).then(isAuth => {
		console.log(isAuth);
        res.status(httpErrors.OK.statusCode).send(isAuth);
    },error => {
        console.log(error);
        res.status(httpErrors.UNAUTHORIZED.statusCode).send(httpErrors.UNAUTHORIZED);

    
    });

});






module.exports = router;