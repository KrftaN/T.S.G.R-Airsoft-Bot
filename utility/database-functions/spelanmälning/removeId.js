const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");
const { updatePlayerCount } = require("../../functions/updatePlayerCount");

module.exports.removeId = async (messageId, userId, interaction) => {
	return await mongo().then(async (mongoose) => {
		try {
			console.log(`Remove name: ${userId}`);

			await updatePlayerCount(interaction, false);
			await anmälningSchema.findOneAndUpdate(
				{
					messageId,
				},
				{
					$pull: {
						anmälda: { userId },
					},
				},
				{
					upsert: true,
					new: true,
				}
			);
		} finally {
			mongoose.connection.close();
		}
	});
};
