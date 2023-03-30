const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.anmälningar = async (uniqueId) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await anmälningSchema.findOne({
				uniqueId,
			});

			return {
				anmälda: result.anmälda,
			};
		} finally {
			mongoose.connection.close();
		}
	});
};
