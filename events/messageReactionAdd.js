const { handleReactionRoles } = require("../src/handlers/handleReactionRoles");
const {
	getSortedReactionRole,
} = require("../utility/database-functions/reactionroles/getSortedReactionRole");

module.exports = {
	name: "messageReactionAdd",
	async execute(reaction, user, bot) {
		// When a reaction is received, check if the structure is partial
		if (reaction.partial) {
			try {
				await reaction.fetch();
			} catch (error) {
				console.error("Something went wrong when fetching the message:", error);
				return;
			}
		}

		if (user.bot) return;

		const reactionRole = await getSortedReactionRole(reaction.message.id, reaction.emoji.name, bot);
		if (!reactionRole) return;
		const { emoticon, messageId, roleId, guildId } = reactionRole;

		if (emoticon === reaction.emoji.name) {
			reaction.users.remove(user);
			handleReactionRoles(roleId, guildId, user, bot); //Adds/removes the role.

		} else if (messageId === reaction.message.id && user.bot === false) {
			//Removes the reaction if it was made on one of the reaction role messages and not one of the chosen reactions.
			reaction.users.remove(user);
		}
	},
};