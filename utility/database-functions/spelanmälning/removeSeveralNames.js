const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");
const { updatePlayerCountWithoutId } = require("../../functions/updatePlayerCountWithoutId");

module.exports.removeSeveralNames = async (names, uniqueId, bot) => {
	return await mongo().then(async (mongoose) => {
		try {
			await anmälningSchema
				.findOneAndUpdate(
					{
						uniqueId,
					},
					{
						$pull: {
							anmälda: { name: { $in: names } },
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
					updatePlayerCountWithoutId(channelId, false, messageId, bot, names.length);
				});
		} finally {
			mongoose.connection.close();
		}
	});
};
