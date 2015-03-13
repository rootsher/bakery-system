var when = require('when');

function ShowProduct(mongo) {
	this._mongo = mongo;
}

ShowProduct.prototype.run = function (req, res) {
	return when.resolve();
};

ShowProduct.prototype.output = function () {
	return {};
};

module.exports = ShowProduct;