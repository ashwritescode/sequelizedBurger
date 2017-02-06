var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var router = express.Router();
var db = require("../models");

//Routes

router.get('/', function(req, res){
	res.redirect('/burgers')
});

router.get('/burgers', function(req, res){
	db.Burger.findAll({})
	.then(function (data){
		var hbsObject = {burgers: data};	
	res.render('index', hbsObject);
		
	});
});

router.post('/burgers/create', function(req, res){
	db.Burger.create({
		burger_name: req.body.burger_name
	})
	 .then(function(){
		res.redirect('/burgers')
	});
});

router.put('/burgers/update/:id', function(req, res){
	db.Burger.update({
		devoured: true,
	},{
		where:{
			id: req.params.id
		}
	})
	res.redirect("/burgers");
});

module.exports = router;