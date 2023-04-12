module.exports.extractCurrentPageNumber = (str) => {
	return parseInt(str.match(/\d+(?= av)/));
};
