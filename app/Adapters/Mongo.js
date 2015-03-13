var MongoClient = require('mongodb').MongoClient;
var when = require('when');
var nodefn = require('when/node');


function MongoAdapter() {
	this.CONNECT_URI = 'mongodb://127.0.0.1:27017/';
	this.DATABASE_NAME = 'bakery-system';

	this._database = undefined;

	this.collections = {};
}

MongoAdapter.prototype.connect = function connect() {
	var self = this;
	var promisedConnect = nodefn.call(MongoClient.connect.bind(MongoClient), (this.CONNECT_URI + this.DATABASE_NAME));

	return promisedConnect.then(function (db) {
		self._database = db;

		return self;
	});
};

MongoAdapter.prototype.addCollection = function addCollection(collectionName) {
	this.collections[collectionName] = this._database.collection(collectionName);
};


module.exports.MongoAdapter = MongoAdapter;