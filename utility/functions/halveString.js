module.exports.halveString = (str) => {
	const strLen = str.length;

	if (strLen % 2 !== 0) {
		str = str.substring(1);
	}

	const halfLen = strLen / 2;
	const firstHalf = str.slice(0, halfLen);

	return firstHalf;
};
