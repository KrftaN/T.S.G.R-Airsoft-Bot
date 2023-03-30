const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");
const { uniqueId } = require("../../functions/uniqueId");
const { halveString } = require("../../functions/halveString");

module.exports.startSpelanmälningar = async (
	messageId,
	datum,
	datumMillies,
	plats,
	länk,
	pris,
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
				pris,
				beskrivning,
				uniqueId: halveString(uniqueId()),
			}).save();
		} finally {
			mongoose.connection.close();
		}
	});
};
