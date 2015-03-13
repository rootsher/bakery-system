var when = require('when');

function AddSupplier(mongo) {
	this._mongo = mongo;
}

AddSupplier.prototype.run = function (req, res) {
	return when.resolve();
};

AddSupplier.prototype.output = function () {
	return {};
};

module.exports = AddSupplier;