const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.getSpelanmälningByUniqueId = async (uniqueId) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await anmälningSchema.findOne({
				uniqueId,
			});

			return result;
		} finally {
			mongoose.connection.close();
		}
	});
};
