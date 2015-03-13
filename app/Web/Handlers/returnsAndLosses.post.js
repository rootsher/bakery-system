var when = require('when');
var nodefn = require('when/node');

function ReturnsAndLosses(mongo) {
	this._mongo = mongo;
	this._output = {
		supplierList: [],
		deliveryList: []
	};
}

ReturnsAndLosses.prototype.run = function (req, res) {
	var self = this;
	var supplierCollection = this._mongo.collections.suppliers;
	var deliveryCollection = this._mongo.collections.deliveries;

	var find = supplierCollection.find({});
	var promisedFindSupplier = nodefn.call(find.toArray.bind(find));

	return promisedFindSupplier.then(function (findSupplierResult) {
		self._output.supplierList = findSupplierResult;

		if (req.body.deliverySorting) {
			var find = deliveryCollection.find({
				deliveryDate: { $gte: req.body.dateFrom, $lte: req.body.dateTo },
				'productData.supplierID': req.body.supplierID
			});
			var promisedFindDelivery = nodefn.call(find.toArray.bind(find));

			return promisedFindDelivery.then(function (findDeliveryResult) {
				self._output.deliveryList = findDeliveryResult;
			});
		}

		if (req.body.deliveryChanges) {
			// Apply delivery changes.
		}

	});
};

ReturnsAndLosses.prototype.output = function () {
	return this._output;
};

module.exports = ReturnsAndLosses;