// shop1 123456


function Server() {
	this.name 		 = 'diao!!';
	this.express 	 = require('express');
	this.app 		 = this.express();
	this.dbUrl       = 'mongodb://localhost:27017/mean';
	this.ObjectID 	 = require('mongodb').ObjectID;	

	// init database 
	
	this.app 		 = this.express();

	this.proifleUrl = '/profile';
	this.productUrl = '/product';


	this.init = function() {
		const MongoClient = require('mongodb').MongoClient;
		const dbUl = 'mongodb://shop1:123456@ds141175.mlab.com:41175/online-shop';
		MongoClient.connect('', (err, db) => {
			consoel.log('connected');


		});

	}


	this.init2 = function() {
		const dbUrl    = this.dbUrl;	
		const client   = require('mongodb').MongoClient;

		// set this for test !!!
		this.app.use(function(req, res, next) {
		  res.header("Access-Control-Allow-Origin", "*");
		  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		  next();
		});

		// set this to handle json
		const bodyParser  = require("body-parser");
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());


		this.app.get(this.proifleUrl, function(req, res, next) {
		  // Handle the get for this route
		  console.log('get request: ' + req);
		  res.send('get it');

		  next();
		});


		this.app.post(this.proifleUrl, function(req, res, next) {
			 // Handle the post for this route
			 console.log('post request: ' + req.body);

			 // on yeah!!! 
			 for (const propery in req.body) {
			 	console.log(propery + " : " + req.body[propery]);
			 }	

			 // get the command
			 const data = req.body;
			 const command = data['command'];

			 if (command === 'register') {
				const name = data['name'];
			 	const password = data['password'];
			 	const collectionName = 'profile';
			 	console.log('register: ');
			 	console.log('register: ' + name + ":" + password);

			 	client.connect(dbUrl, (err, db) => {
			 		if (err) throw err;	// to-do

			 		console.log('db connected');
			 		const query = {name: name};
			 		db.collection(collectionName)
			 			.find({}, query)
			 			.toArray(
			 				(err2, result) => {
			 					console.log('find err2: ' + err2 );
			 					if (err2) throw err2; // to-do
			 					console.log('result:' + result);

			 					if (result[0]) {
			 						// profile not found
			 						console.log('found');
			 						res.send('valid');

			 					}

			 					res.send('not found');
			 				}

			 				// if we found it. then verify

			 			);

			 	});
			 }	
			 else if (command === 'verify') {
			 	const name = data['name'];
			 	const password = data['password'];
			 	const collectionName = 'profile';
			 	console.log('verify: ');
			 	console.log('verify: ' + name + ":" + password);

			 	client.connect(dbUrl, (err, db) => {
			 		if (err) throw err;	// to-do

			 		console.log('db connected');
			 		const query = {name: name};
			 		db.collection(collectionName)
			 			.find({}, query)
			 			.toArray(
			 				(err2, result) => {
			 					console.log('find err2: ' + err2 );
			 					if (err2) throw err2; // to-do
			 					console.log('result:' + result);

			 					if (!result) {
			 						// profile not found
			 						console.log('not found');
			 						res.send('invalid');

			 					}

			 					db.close();
			 				}

			 				// if we found it. then verify

			 			);

			 	});
			 }

			 // res.send('post it');

			 // next();
		});


		// this.app.use(this.bodyParser.urlencoded({ extended: false }));
		// this.app.use(this.bodyParser.json());

		// this.app.post('/login',function(req,res){
		//   	var user_name = req.body.name;
		//   	var password  = req.body.password;
		//   	console.log("User name = "+user_name+", password is "+password);
		//   	//res.end("true");
		//   	res.send('wwwwwwwww');
		// });	


		// this.app.post('login',function(req,res){
		//   	console.log('got req');
		// });


		// const bodyParser  = require("body-parser");
		// this.app.use(bodyParser.json()); // for parsing application/json
		// this.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

		// this.app.post('/profile', upload.array(), function (req, res, next) {
		//   console.log(req.body);
		//   res.json(req.body);
		// });

		this.app.get('/', function (req, res) {
			console.log('get request from ' + req.hostname);
  			res.send('POST request to homepage');
  			// res.json({index: 100});
		});

	}


	



	this.run = function() {
		this.init();
		console.log("server listen on 5678");
		//this.app.listen(process.env.PORT || 5678);
	};

	/*
		user:
			1. query     user   (name & password)
			2. register  user   (name & password & address)


		product:
			1. query all (with default amount maybe):
				/fetchProduct/:amount
			3. insert product 	
				/addProduct. json啊啊啊啊啊~
	*/	

}

const server = new Server();
server.run();
