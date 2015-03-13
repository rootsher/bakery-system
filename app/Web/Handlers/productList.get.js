var when = require('when');
var nodefn = require('when/node');

function ProductList(mongo) {
	this._mongo = mongo;
	this._output = {};
}

ProductList.prototype.run = function (req, res) {
	var self = this;
	var productCollection = this._mongo.collections.products;

	var find = productCollection.find({});
	var promisedFind = nodefn.call(find.toArray.bind(find));

	return promisedFind.then(function (findResult) {
		self._output.productList = findResult;
	});
};

ProductList.prototype.output = function () {
	return this._output;
};

module.exports = ProductList;