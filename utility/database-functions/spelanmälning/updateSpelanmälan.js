const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");
const { updateSpelanmälanEmbed } = require("../../functions/updateSpelanmälanEmbed");
module.exports.updateSpelanmälan = async (
	bot,
	channelId,
	messageId,
	datum,
	pris,
	plats,
	länk,
	beskrivning,
	messageUniqueId,
	totalAnmälda
) => {
	return await mongo().then(async (mongoose) => {
		try {
			await anmälningSchema.findOneAndUpdate(
				{
					messageId,
				},
				{
					$set: {
						datum,
						pris,
						plats,
						länk,
						beskrivning,
					},
				},
				{
					upsert: true,
					new: true,
				}
			);

			await updateSpelanmälanEmbed(
				bot,
				channelId,
				messageId,
				datum,
				pris,
				plats,
				länk,
				beskrivning,
				messageUniqueId,
				totalAnmälda
			);
		} finally {
			mongoose.connection.close();
		}
	});
};
