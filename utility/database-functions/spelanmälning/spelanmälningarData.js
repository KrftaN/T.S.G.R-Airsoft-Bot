const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.spelanmälningarData = async (messageId) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await anmälningSchema.findOne({
				messageId,
			});

			return result;
		} finally {
			mongoose.connection.close();
		}
	});
};
