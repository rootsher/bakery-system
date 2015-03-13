var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var jade = require('jade');
var fs = require('fs');

var routingMap = require(__dirname + '/routing.json');

var MongoAdapter = require(__dirname + '/../Adapters/Mongo.js').MongoAdapter;

var mongo = new MongoAdapter();

app.use(function (req, res, next) {
	mongo.connect().done(function (db) {
		db.addCollection('suppliers');
		db.addCollection('products');
		db.addCollection('deliveries');

		next();
	});
});

app.use(express.static(__dirname + '/Resources/'));
app.use(bodyParser.urlencoded({ extended: false }));

function handleRequest(route, method) {
	app[method](route.path, function (req, res) {
		var requestFileName = (route.name + '.' + method);
		var handlerPath = (__dirname + '/Handlers/' + requestFileName + '.js');
		var templatePath = (__dirname + '/Templates/' + requestFileName + '.jade');

		var RequestHandler = require(handlerPath);

		var handler = new RequestHandler(mongo);

		handler.run(req, res).then(function () {
			var output = handler.output();
			output.params = req.params;

			var html = jade.compileFile(templatePath)(output);

			res.send(html);
		});
	});
}

routingMap.forEach(function (route) {
	route.methods.forEach(handleRequest.bind(undefined, route));
});

app.listen(4500);