var when = require('when');
var nodefn = require('when/node');
var uuid = require('node-uuid');

function EnterDelivery(mongo) {
	this._mongo = mongo;
	this._output = {};
}

EnterDelivery.prototype.run = function (req, res) {
	console.log(req.body);

	var self = this;
	var productCollection = this._mongo.collections.products;
	var deliveryCollection = this._mongo.collections.deliveries;

	var find = productCollection.find({
		_id: req.body.productID
	});
	var promisedFind = nodefn.call(find.toArray.bind(find));

	if (!req.body.inputQuantity) {
		this._output.content = 'Input quantity must be greater than 0.';
		return when.resolve();
	}

	var insertData = {
		_id: uuid.v4(),
		deliveryDate: req.body.deliveryDate,
		productData: {},
		inputQuantity: req.body.inputQuantity
	};

	return promisedFind.then(function (findResult) {
		if (findResult.length === 0) {
			self._output.content = 'Not found product in database.';
			return;
		}

		insertData.productData = findResult[0];

		var promisedInsert = nodefn.call(deliveryCollection.insert.bind(deliveryCollection, insertData));

		return promisedInsert.then(function () {
			self._output.content = 'Delivery entered.';
		});
	});
};

EnterDelivery.prototype.output = function () {
	return this._output;
};

module.exports = EnterDelivery;