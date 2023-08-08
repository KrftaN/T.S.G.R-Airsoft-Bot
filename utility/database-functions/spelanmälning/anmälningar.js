const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.anmälningar = async (uniqueId) => {
	return await mongo().then(async (mongoose) => {
		try {
			const { anmälda } = await anmälningSchema.findOne({
				uniqueId,
			});

			return anmälda;
		} finally {
			mongoose.connection.close();
		}
	});
};
