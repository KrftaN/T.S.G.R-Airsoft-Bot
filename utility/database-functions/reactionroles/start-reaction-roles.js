const mongo = require("../../mongo");
const reactionRoleSchema = require("../../../schemas/reactionRoleSchema");

module.exports.startReactionRoles = async (
	messageId,
	emoticon,
	roleId,
	channelId,
	guildId,
	reactionRoleId,
	bot
) => {
	return await mongo().then(async (mongoose) => {
		try {
			const { reactionRoleCache } = bot;
			let list = reactionRoleCache.get(messageId);

			await new reactionRoleSchema({
				messageId,
				emoticon,
				roleId,
				channelId,
				guildId,
				reactionRoleId,
			})
				.save()
				.then(async (result) => {
					if (Array.isArray(list)) {
						list.push(result);
						reactionRoleCache.set(messageId, list);

						console.log(list);
					} else {
						const resultFromDB = await reactionRoleSchema.find({ messageId });
						reactionRoleCache.set(messageId, resultFromDB);
					}
				});
		} finally {
			mongoose.connection.close();
		}
	});
};
