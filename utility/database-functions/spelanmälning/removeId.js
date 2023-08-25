const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");
const { updatePlayerCountWithoutId } = require("../../functions/updatePlayerCountWithoutId");

module.exports.removeId = async (uniqueId, userId, bot) => {
	return await mongo().then(async (mongoose) => {
		try {
			console.log(`Remove name: ${userId}`);
			await anmälningSchema
				.findOneAndUpdate(
					{
						uniqueId,
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
				)
				.then((result) => {
					const { userCache } = bot;
					const { channelId, messageId } = result;

					userCache.set(uniqueId, result);
					updatePlayerCountWithoutId(channelId, false, messageId, bot, 1);
				});
		} finally {
			mongoose.connection.close();
		}
	});
};
