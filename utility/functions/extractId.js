module.exports.extractId = (str) => {
	const idRegex = /id:\s*(\w+)/;
	const match = str.match(idRegex);
	return match ? match[1] : null;
};
