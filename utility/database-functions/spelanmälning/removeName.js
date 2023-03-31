const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");
const { updatePlayerCountWithoutId } = require("../../functions/updatePlayerCountWithoutId");

module.exports.removeName = async (name, interaction, uniqueId, bot) => {
	return await mongo().then(async (mongoose) => {
		try {
			console.log("removed name");

			const result = await anmälningSchema.findOneAndUpdate(
				{
					uniqueId,
				},
				{
					$pull: {
						anmälda: { name },
					},
				},
				{
					upsert: true,
					new: true,
				}
			);
			await updatePlayerCountWithoutId(interaction, false, result.messageId, bot);
		} finally {
			mongoose.connection.close();
		}
	});
};
