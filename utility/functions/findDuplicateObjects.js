module.exports.findDuplicateObjects = (arr) => {
  const seen = [];
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    if (seen.some((seenObj) => seenObj.messageId === obj.messageId)) {
      duplicates.push(obj);
    } else {
      seen.push(obj);
    }
  }
  return seen.concat(duplicates);
};