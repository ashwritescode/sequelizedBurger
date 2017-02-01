var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var router = express.Router();
var burgers = require('../models/burger.js');

//Routes

router.get('/', function(req, res){
	res.redirect('/burgers')
});

router.get('/burgers', function(req, res){
	burgers.selectAll(function(data){
		var hbsObject = {burgers: data};

		console.log(hbsObject);

		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function(req, res){
	burgers.insertOne(['burger_name'], [req.body.b_name], function(){
		res.redirect('/burgers')
	});
});

router.put('/burgers/update/:id', function(req, res){
	var condition = 'id = ' + req.params.id;

	console.log('condition ', condition);

	burgers.updateOne({'devoured': req.body.devoured}, condition, function(){
		res.redirect('/burgers');
	});
});

module.exports = router;