const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.spelanmälningarDataByUniqueId = async (uniqueId) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await anmälningSchema.findOne({
				uniqueId,
			});

			return {
				datum: result.datum,
				plats: result.plats,
				länk: result.länk,
				pris: result.pris,
				beskrivning: result.beskrivning,
				uniqueId,
				anmälda: result.anmälda,
			};
		} finally {
			mongoose.connection.close();
		}
	});
};
