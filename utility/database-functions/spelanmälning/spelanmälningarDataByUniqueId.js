const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.spelanmälningarDataByUniqueId = async (uniqueId, bot) => {
	return await mongo().then(async (mongoose) => {
		try {
			const { userCache } = bot;
			if (!userCache.get(uniqueId)) {
				const result = await anmälningSchema.findOne({
					uniqueId,
				});
				userCache.set(uniqueId, result);

				return result;
			} else {
				console.log("gathered cached data");

				return userCache.get(uniqueId);
			}
		} finally {
			mongoose.connection.close();
		}
	});
};
