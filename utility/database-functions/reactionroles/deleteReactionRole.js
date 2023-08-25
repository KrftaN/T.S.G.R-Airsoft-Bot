const mongo = require("../../mongo");
const reactionRoleSchema = require("../../../schemas/reactionRoleSchema");

module.exports.deleteReactionRole = async (reactionRoleId, bot) => {
	return await mongo().then(async (mongoose) => {
		try {
			await reactionRoleSchema.findOneAndDelete({ reactionRoleId }).then((result) => {
				console.log(result);

				/* const {reactionRoleCache} = bot
			reactionRoleCache.set(reactionRoleId) */
			});
		} finally {
			mongoose.connection.close();
		}
	});
};
