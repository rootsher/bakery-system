var when = require('when');

function ShowDelivery(mongo) {
	this._mongo = mongo;
}

ShowDelivery.prototype.run = function (req, res) {
	return when.resolve();
};

ShowDelivery.prototype.output = function () {
	return {};
};

module.exports = ShowDelivery;