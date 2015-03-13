var when = require('when');
var nodefn = require('when/node');
var uuid = require('node-uuid');

function AddSupplier(mongo) {
	this._mongo = mongo;
	this._output = {};
}

AddSupplier.prototype.run = function (req, res) {
	var self = this;
	var supplierCollection = this._mongo.collections.suppliers;

	var find = supplierCollection.find({
		name: req.body.name
	});
	var promisedFind = nodefn.call(find.toArray.bind(find));

	return promisedFind.then(function (findResult) {
		if (findResult.length > 0) {
			self._output.content = 'Supplier exists in database.';
			return;
		}

		var promisedInsert = nodefn.call(supplierCollection.insert.bind(supplierCollection, {
			_id: uuid.v4(),
			name: req.body.name
		}));

		return promisedInsert.then(function () {
			self._output.content = 'Supplier added.';
		});

	});
};

AddSupplier.prototype.output = function () {
	return this._output;
};

module.exports = AddSupplier;