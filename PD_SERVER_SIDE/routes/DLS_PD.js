var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/a', function(req, res, next) {
  console.log('[DLS_PD] GET RECEIVED!!!');
});

router.post('/', function(req, res, next) {
	console.log('[DLS_PD] POST RECEIVED!!!');
	//console.log(req);
	//console.log(res);
	console.log(req.body);
});
module.exports = router;
