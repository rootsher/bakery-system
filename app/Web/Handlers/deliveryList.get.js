var when = require('when');
var nodefn = require('when/node');

function DeliveryList(mongo) {
	this._mongo = mongo;
	this._output = {};
}

DeliveryList.prototype.run = function (req, res) {
	var self = this;
	var deliveryCollection = this._mongo.collections.deliveries;

	var find = deliveryCollection.find({});
	var promisedFind = nodefn.call(find.toArray.bind(find));

	return promisedFind.then(function (findResult) {
		self._output.deliveryList = findResult;
	});
};

DeliveryList.prototype.output = function () {
	return this._output;
};

module.exports = DeliveryList;