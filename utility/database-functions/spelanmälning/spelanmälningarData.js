const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.spelanmälningarData = async (messageId) => {
	console.log(messageId);

	return await mongo().then(async (mongoose) => {
		try {
			const result = await anmälningSchema.findOne({
				messageId,
			});

			return {
				datum: result.datum,
				plats: result.plats,
				länk: result.länk,
				pris: result.pris,
				beskrivning: result.beskrivning,
				uniqueId: result.uniqueId,
				anmälda: result.anmälda,
			};
		} finally {
			mongoose.connection.close();
		}
	});
};
