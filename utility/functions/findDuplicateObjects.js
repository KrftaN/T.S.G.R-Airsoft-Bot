module.exports.findDuplicateObjects = (arr, userIdToFind) => {
	const duplicates = [];
	const uniqueIds = new Set();

	arr.forEach((obj) => {
		const userId = obj.userId;
		if (userId === userIdToFind) {
			if (uniqueIds.has(userId)) {
				duplicates.push(obj);
			} else {
				uniqueIds.add(userId);
				duplicates.push(obj); // Add the first occurrence of the userId as well
			}
		}
	});

	return duplicates;
};
