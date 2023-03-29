const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");

module.exports.addId = async (messageId, userId, name) => {
	return await mongo().then(async (mongoose) => {
		try {
			result = await anmälningSchema.findOneAndUpdate(
				{
					messageId: messageId,
				},
				{
					$push: {
						anmälda: { userId, name },
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
