const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.deleteSpelanmälning = async (uniqueId) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await anmälningSchema.findOneAndDelete({
				uniqueId,
			});

			return result;
		} finally {
			mongoose.connection.close();
		}
	});
};
