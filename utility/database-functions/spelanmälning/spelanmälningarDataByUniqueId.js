const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.spelanmälningarDataByUniqueId = async (uniqueId) => {
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
