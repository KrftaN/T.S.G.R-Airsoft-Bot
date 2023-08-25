const mongo = require("../../mongo");
const reactionRoleSchema = require("../../../schemas/reactionRoleSchema");

module.exports.getReactionRoleList = async (guildId, channelId, entireGuild, bot) => {
	return await mongo().then(async (mongoose) => {
		try {
			let result;

			if (entireGuild === "true") {
				result = await reactionRoleSchema.find({ guildId });
			} else {
				result = await reactionRoleSchema.find({ guildId, channelId });
			}

			return result;
		} finally {
			mongoose.connection.close();
		}
	});
};
