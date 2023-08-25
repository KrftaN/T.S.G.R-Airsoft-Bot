const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");
const { updatePlayerCount } = require("../../functions/updatePlayerCount");
const { findDuplicateObjectsName } = require("../../functions/findDuplicateObjectsName");

module.exports.addId = async (messageId, userId, name, interaction, tag, bot) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await anmälningSchema.findOne({
				messageId,
			});
			const duplicates = findDuplicateObjectsName(result.anmälda, name);
			if (duplicates.length > 0) {
				return false;
			} else {
				await anmälningSchema
					.findOneAndUpdate(
						{
							messageId,
						},
						{
							$push: {
								anmälda: { userId, name, tag },
							},
						},
						{
							upsert: true,
							new: true,
						}
					)
					.then((result) => {
						const { userCache } = bot;
						const { uniqueId } = result;

						userCache.set(uniqueId, result);
					});
				console.log(`Inserted: ${name}`);
				updatePlayerCount(interaction, true);
				return true;
			}
		} finally {
			mongoose.connection.close();
		}
	});
};
