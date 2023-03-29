const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.startSpelanmälningar = async (
	messageId,
	datum,
	datumMillies,
	plats,
	länk,
	beskrivning
) => {
	return await mongo().then(async (mongoose) => {
		try {
			await new anmälningSchema({
				messageId,
				datum,
				datumMillies,
				plats,
				länk,
				beskrivning,
			}).save();
		} finally {
			mongoose.connection.close();
		}
	});
};
