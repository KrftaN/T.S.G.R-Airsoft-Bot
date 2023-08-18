const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const {
	startReactionRoles,
} = require("../../utility/database-functions/reactionroles/start-reaction-roles");
const { uniqueId } = require("../../utility/functions/uniqueId");

module.exports = {
	name: "starta-reaktionsroll",
	creator: false,
	admin: true,
	permissions: "MANAGE_ROLES",
	data: new SlashCommandBuilder()
		.setName("starta-reaktionsroll")
		.setDescription("Starta en reaktionsroll.")
		.addStringOption((option) => {
			return (option = option
				.setName("messagelink")
				.setDescription("Messagelink till meddelandet du vill starta reaktionrollen på.")
				.setRequired(true));
		})
		.addRoleOption((option) => {
			return (option = option
				.setName("role")
				.setDescription("Rollen du vill att användaren ska tilldelas.")
				.setRequired(true));
		})
		.addStringOption((option) => {
			return (option = option
				.setName("emoticon")
				.setDescription("Reaktionsrollens emoji.")
				.setRequired(true));
		}),
	async execute(interaction, bot) {
		const { options } = interaction;

		const role = options.getRole("role");
		const messagelink = options.getString("messagelink");
		const messageId = messagelink.split("/")[6];
		const channelId = messagelink.split("/")[5];
		const guildId = messagelink.split("/")[4];
		const emoticon = options.getString("emoticon");
		const reactionRoleId = uniqueId();

		try {
			if (role.name === "@everyone")
				return interaction.reply({ content: "You have to include a valid role." });

			const emoticonRegex =
				/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

			const message = await bot.guilds.cache
				.get(guildId)
				.channels.cache.get(channelId)
				.messages.fetch(messageId);

			if (emoticonRegex.test(emoticon) === false)
				return interaction.reply({ content: "You have to include a valid emoticon." });

			if (!message)
				return interaction.reply({ content: "You have to include a valid message id." });

			await startReactionRoles(
				messageId,
				emoticon,
				role.id,
				message.channel.id,
				interaction.guild.id,
				reactionRoleId,
				bot
			);

			const embed = new EmbedBuilder()
				.setTitle("Reaction Roles Setup Done")
			.setColor("#ffa500")
				.addFields(
					{
						name: "Message ID",
						value: messageId.toString(),
						inline: true,
					},
					{
						name: "Emoticon",
						value: emoticon.toString(),
						inline: true,
					},
					{
						name: "Guild ID",
						value: message.guild.id.toString(),
						inline: true,
					}
				)
				.addFields(
					{
						name: "Channel",
						value: `${message.channel}`,
						inline: true,
					},
					{
						name: "Reaction Role ID",
						value: `${reactionRoleId}`,
						inline: true,
					},
					{
						name: "Role",
						value: `${role}`,
						inline: true,
					}
				)
				.setTimestamp(new Date())
				.setFooter({
					text: `Tactical Squad of Random Guys`,
					iconURL: bot.user.avatarURL({ dynamic: true }),
				});
			await message.react(emoticon);
			await interaction.reply({ embeds: [embed], ephemeral: true });
		} catch (err) {
			console.log(err);

			interaction.reply({ content: "You have to include a valid message id." });
		}
	},
};
