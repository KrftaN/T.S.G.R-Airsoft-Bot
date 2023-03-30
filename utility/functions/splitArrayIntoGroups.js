module.exports.splitArrayIntoGroups = (array) => {
	const result = [];
	let group = [];
	let groupSize = 0;

	for (let i = 0; i < array.length; i++) {
		group.push(array[i].name);
		groupSize++;

		if (groupSize === 5) {
			result.push(group);
			group = [];
			groupSize = 0;
		}
	}

	if (groupSize > 0) {
		result.push(group);
	}

	return { groups: result, count: result.length };
};
