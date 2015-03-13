var when = require('when');

function Warehouse(mongo) {
	this._mongo = mongo;
}

Warehouse.prototype.run = function (req, res) {
	return when.resolve();
};

Warehouse.prototype.output = function () {
	return {};
};

module.exports = Warehouse;