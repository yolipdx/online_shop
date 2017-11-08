// shop1 123456

const express      = require('express');
const app          = express();
const MongoClient  = require('mongodb').MongoClient;
const dbUl = 'mongodb://shop1:123456@ds141175.mlab.com:41175/online-shop';

orders = [];

init = function() {
	app.use(function(req, res, next) {
		  res.header("Access-Control-Allow-Origin", "*");
		  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		  next();
	});

	// set this to handle json
	const bodyParser  = require("body-parser");
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
}

register = function(name, password, queryResult, db, res) {
	console.log('register');
	const loginfo = {name: name, password: password};
	if (0 === queryResult.length) {	// new user
		db.collection('profile').save(loginfo, (err, result) => {
			if (err) {
				return console.log(err);
				res.send({status: 'error'});	// error
			}

			console.log('logininfo saved to database');
			res.send({status: 'registered ok'});	// success
			//next();
		});		
	} else {
		res.send({status: 'the name is already registered'});	// alraedy registered
	}

}

verify = function(name, password, queryResult, db, res) {
	console.log('register');
	const loginfo = {name: name, password: password};
	if (0 !== queryResult.length && queryResult[0].password === password) res.send({status: 'valid'});
	else res.send({status: 'invalid'});
	
}

handler_ordder = function(order) {
	orders.push(order);
}

init_route = function(db) {
	app.post('/profile', (req, res, next) => {
		const data = req.body;
		const name = data['name'];
		const password = data['password'];
		const command = data['command'];

		console.log('profile post  query: ' +  name);
		// look for if the entry exsits.
		db.collection('profile').find({name: name}).toArray(
			(err, result) => {
				if(err) throw err;	// err occued
				console.log('query result: ' + result.length);	
				if (command === 'register') register(name, password, result, db, res);
				else				          verify(name, password, result, db, res); 
			}	

		);
	});


	app.post('/order', (req, res) => {
		/*
			product name
			contact name
			contact phone
			address
		*/
		const order = req.body;
		handler_ordder(order);
	});
}


init_app = function() {
	MongoClient.connect(dbUl, (err, db) => {
		console.log('connected');

		init();
		init_route(db);	

		app.listen(process.env.PORT || 5678);
	});
}

init_app();


