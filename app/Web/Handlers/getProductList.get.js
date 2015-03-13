var when = require('when');
var nodefn = require('when/node');

function GetProductList(mongo) {
	this._mongo = mongo;
	this._output = {};
}

GetProductList.prototype.run = function (req, res) {
	var supplierID = req.query.supplierID;

	var self = this;
	var productCollection = this._mongo.collections.products;

	var find = productCollection.find({
		supplierID: supplierID
	});
	var promisedFind = nodefn.call(find.toArray.bind(find));

	return promisedFind.then(function (findResult) {
		self._output.productList = JSON.stringify(findResult);
	});
};

GetProductList.prototype.output = function () {
	return this._output;
};

module.exports = GetProductList;