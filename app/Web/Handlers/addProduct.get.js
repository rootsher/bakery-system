var when = require('when');
var nodefn = require('when/node');

function AddProduct(mongo) {
	this._mongo = mongo;
	this._output = {};
}

AddProduct.prototype.run = function (req, res) {
	var self = this;
	var supplierCollection = this._mongo.collections.suppliers;

	var find = supplierCollection.find({});
	var promisedFind = nodefn.call(find.toArray.bind(find));

	return promisedFind.then(function (findResult) {
		self._output.supplierList = findResult;
	});
};

AddProduct.prototype.output = function () {
	return this._output;
};

module.exports = AddProduct;