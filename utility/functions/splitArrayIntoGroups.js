module.exports.splitArrayIntoGroups = (array) => {
	const result = new Array();
	let group = new Array();
	for (let i = 0; i < array.length; i++) {
		if (group.length < 5) {
			group.push(array[i].name);
		} else {
			result.push(group);
			group = [array[i].name];
		}
	}
	if (group.length > 0) {
		result.push(group);
	}
	return { groups: result, count: result.length };
};
