var when = require('when');

function Summary(mongo) {
	this._mongo = mongo;
}

Summary.prototype.run = function (req, res) {
	return when.resolve();
};

Summary.prototype.output = function () {
	return {};
};

module.exports = Summary;