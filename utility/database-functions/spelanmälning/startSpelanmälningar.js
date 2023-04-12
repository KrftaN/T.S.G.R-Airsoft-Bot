const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.startSpelanmälningar = async (
	messageId,
	datum,
	plats,
	länk,
	pris,
	beskrivning,
	guildId,
	channelId,
	uniqueId
) => {
	return await mongo().then(async (mongoose) => {
		try {
			await new anmälningSchema({
				messageId,
				datum,
				plats,
				länk,
				pris,
				beskrivning,
				uniqueId,
				guildId,
				channelId,
			}).save();
		} finally {
			mongoose.connection.close();
		}
	});
};
