var when = require('when');

function Index(mongo) {
	this._mongo = mongo;
}

Index.prototype.run = function (req, res) {
	return when.resolve();
};

Index.prototype.output = function () {
	return {};
};

module.exports = Index;