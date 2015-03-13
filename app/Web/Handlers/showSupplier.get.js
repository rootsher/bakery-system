var when = require('when');

function ShowSupplier(mongo) {
	this._mongo = mongo;
}

ShowSupplier.prototype.run = function (req, res) {
	return when.resolve();
};

ShowSupplier.prototype.output = function () {
	return {};
};

module.exports = ShowSupplier;