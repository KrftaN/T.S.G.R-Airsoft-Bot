module.exports.extractCurrentPageNumber = (str) => {
	const regex = /Sida\s+(\d+)\sav\s+\d+\s+\|\s+id/;
	const match = str.match(regex);
	if (match) {
		return parseInt(match[1], 10);
	}
	return null;
};
