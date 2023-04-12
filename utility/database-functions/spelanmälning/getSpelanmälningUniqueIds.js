const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.getSpelanmälningUniqueIds = async (guildId) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await anmälningSchema.find({
				guildId,
			});

			return result;
		} finally {
			mongoose.connection.close();
		}
	});
};
