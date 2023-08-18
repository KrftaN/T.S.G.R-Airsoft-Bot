const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const {
	deleteReactionRole,
} = require("../../utility/database-functions/reactionroles/deleteReactionRole");
const {
	getReactionRole,
} = require("../../utility/database-functions/reactionroles/getReactionRole");

module.exports = {
	name: "radera-reaktionsroll",
	creator: false,
	admin: true,
	permissions: "MANAGE_ROLES",
	data: new SlashCommandBuilder()
		.setName("radera-reaktionsroll")
		.setDescription("Lets people add roles via reacting to a targeted message.") // BOOLEAN
		.addStringOption((option) => {
			return (option = option
				.setName("messagelink")
				.setDescription("Input the message link to the reaction role you want to remove.")
				.setRequired(true));
		})
		.addBooleanOption((option) => {
			return (option = option
				.setName("delete")
				.setDescription("Choose whether  or not to delete the original message.")
				.setRequired(false));
		}),
	async execute(interaction, bot) {
		const { options } = interaction;

		const deleteBoolean = options.getBoolean("delete");
		const messagelink = options.getString("messagelink");
		const messageId = messagelink.split("/")[6];
		const channelId = messagelink.split("/")[5];
		const guildId = messagelink.split("/")[4];

		try {
			const message = await bot.guilds.cache
				.get(guildId)
				.channels.cache.get(channelId)
				.messages.fetch(messageId);

			if (!message)
				return interaction.reply({ content: "You have to include a valid message link." });

			if (deleteBoolean === true) {
				message.delete();
			} else {
				message.reactions
					.removeAll()
					.catch((error) => console.error("Failed to clear reactions:", error));
			}

			const data = await getReactionRole(messageId);

			await deleteReactionRole(data.uniqueId);

			const embed = new EmbedBuilder()
				.setTitle("Successfully deleted the reaction role")
			.setColor("#ffa500")
				.addFields(
					{
						name: "Message ID",
						value: messageId.toString(),
						inline: true,
					},
					{
						name: "Emoticon",
						value: data.emoticon.toString(),
						inline: true,
					},
					{
						name: "Guild ID",
						value: message.guild.id.toString(),
						inline: true,
					}
				)
				.setTimestamp(new Date())
				.setFooter({
					text: `Tactical Squad of Random Guys`,
					iconURL: bot.user.avatarURL({ dynamic: true }),
				});

			await interaction.reply({ embeds: [embed], ephemeral: true });
		} catch (err) {
			interaction.reply({ content: "You have to include a valid message id." });
		}
	},
};
