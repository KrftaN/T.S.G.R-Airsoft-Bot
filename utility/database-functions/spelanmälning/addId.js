const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");
const { updatePlayerCount } = require("../../functions/updatePlayerCount");

module.exports.addId = async (messageId, userId, name, interaction, tag) => {
	return await mongo().then(async (mongoose) => {
		try {
			console.log("Inserted name!");

			await updatePlayerCount(interaction, true);
			await anmälningSchema.findOneAndUpdate(
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
			);
		} finally {
			mongoose.connection.close();
		}
	});
};
