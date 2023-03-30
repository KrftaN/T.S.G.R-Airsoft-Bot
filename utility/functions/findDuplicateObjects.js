 module.exports.findDuplicateObjects = (arr) => {
    const seen = {};
    const duplicates = [];
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (seen[obj.messageId]) {
        duplicates.push(obj);
      } else {
        seen[obj.messageId] = true;
      }
    }
    return duplicates;
};

  