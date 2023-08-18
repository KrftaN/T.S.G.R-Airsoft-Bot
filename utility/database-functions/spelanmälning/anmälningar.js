const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.anmälningar = async (uniqueId, userCache) => {
	return await mongo().then(async (mongoose) => {
		try {
			if (!userCache.get(uniqueId)) {
				const { anmälda } = await anmälningSchema.findOne({
					uniqueId,
				});
				userCache.set(uniqueId, anmälda);

				return anmälda;
			} else {
				console.log("here");

				return userCache.get(uniqueId);
			}
		} finally {
			mongoose.connection.close();
		}
	});
};
