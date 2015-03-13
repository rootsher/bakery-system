var when = require('when');
var nodefn = require('when/node');
var uuid = require('node-uuid');

function AddProduct(mongo) {
	this._mongo = mongo;
	this._output = {};
}

AddProduct.prototype.run = function (req, res) {
	var self = this;
	var productCollection = this._mongo.collections.products;

	var find = productCollection.find({
		supplierID: req.body.supplierID,
		name: req.body.name
	});
	var promisedFind = nodefn.call(find.toArray.bind(find));

	return promisedFind.then(function (findResult) {
		if (findResult.length > 0) {
			self._output.content = 'Product exists in database.';
			return;
		}

		var promisedInsert = nodefn.call(productCollection.insert.bind(productCollection, {
			_id: uuid.v4(),
			supplierID: req.body.supplierID,
			name: req.body.name,
			inputUnit: req.body.inputUnit,
			outputUnit: req.body.outputUnit,
			inputConvertValue: req.body.inputConvertValue,
			outputConvertValue: req.body.outputConvertValue,
			purchasePrice: req.body.purchasePrice,
			sellingPrice: req.body.sellingPrice
		}));

		return promisedInsert.then(function () {
			self._output.content = 'Product added.';
		});
	});
};

AddProduct.prototype.output = function () {
	return this._output;
};

module.exports = AddProduct;