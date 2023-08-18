const mongo = require("../../mongo");
const reactionRoleSchema = require("../../../schemas/reactionRoleSchema");

module.exports.getSortedReactionRole = async (messageId, emoticon, bot) => {
	return await mongo().then(async (mongoose) => {
		try {
			const { reactionRoleCache } = bot;
			const list = reactionRoleCache.get(messageId);

			if (!list) {
				const result = await reactionRoleSchema.find({ messageId });
				reactionRoleCache.set(messageId, result);

				const reactionRole = result.find((obj) => obj.emoticon === emoticon);
				return reactionRole;
			} else {
				console.log(list);

				const reactionRole = list.find((obj) => obj.emoticon === emoticon);
				return reactionRole;
			}
		} finally {
			mongoose.connection.close();
		}
	});
};
