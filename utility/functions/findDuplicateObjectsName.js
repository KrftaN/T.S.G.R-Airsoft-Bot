module.exports.findDuplicateObjectsName = (arr, usernameToFind) => {
	const duplicates = [];
	const uniqueNames = new Set();

	arr.forEach((obj) => {
		const name = obj.name;
		if (name === usernameToFind) {
			if (uniqueNames.has(name)) {
				duplicates.push(obj);
			} else {
				uniqueNames.add(name);
				duplicates.push(obj); // Add the first occurrence of the userId as well
			}
		}
	});

	return duplicates;
};
