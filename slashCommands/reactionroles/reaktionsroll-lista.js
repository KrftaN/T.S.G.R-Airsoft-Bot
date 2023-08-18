const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const {
	getReactionRoleList,
} = require("../../utility/database-functions/reactionroles/getReactionRoleList");

module.exports = {
	name: "reaktionsroll-lista",
	creator: false,
	admin: true,
	permissions: "MANAGE_ROLES",
	data: new SlashCommandBuilder()
		.setName("reaktionsroll-lista")
		.setDescription("Lista över alla aktiva reaktionsroller")
		.addStringOption((option) => {
			return (option = option
				.setName("option")
				.setDescription(
					"Välj om du vill se alla reaktionsroller i antingen hela servern eller denna kanal."
				)
				.addChoices({ name: "server", value: "true" })
				.addChoices({ name: "kanal", value: "false" })
				.setRequired(true));
		}),
	async execute(interaction, bot) {
		const { options } = interaction;
		await interaction.deferReply({ ephemeral: true });
		const option = options.getString("option");
		const reactionRoleMessages = await getReactionRoleList(
			interaction.guild.id,
			interaction.channel.id,
			option,
			bot
		);
		let array = new Array();

		const embed = new EmbedBuilder()
			.setTitle(`Reaktionsroller i denna ${option === true ? "server" : "kanal"}:`)
			.setColor("#ffa500")
			.setTimestamp(new Date())
			.setFooter({
				text: `Tactical Squad of Random Guys`,
				iconURL: bot.user.avatarURL({ dynamic: true }),
			});

		reactionRoleMessages.forEach((reactionRole) => {
			console.log(reactionRole);
			if (option === false && interaction.channel.id !== reactionRole.channel) return; //The reason option === false is because that means the user chose channel only, and if they did and the reaction role message was in another message, the loop returns.

			const role = interaction.guild.roles.cache.find((role) => role.id === reactionRole.roleId);
			array.push(
				`\n**Reaktionsroll ID: ${reactionRole.reactionRoleId}**\nEmoji: ${reactionRole.emoticon}\nMessage ID: ${reactionRole.messageId}\nRoll: ${role}\nDirektlänk: [Click here!](https://discord.com/channels/${reactionRole.guildId}/${reactionRole.channelId}/${reactionRole.messageId})`
			);
		});

		if (array.join("").split("").length < 2300) {
			embed.setDescription(
				array.length === 0
					? `Det finns inga reaktionsroller i denna ${option === true ? "server" : "kanal"}`
					: array.join("\n")
			);

			await interaction.followUp({ embeds: [embed], ephemeral: true });
		} else {
			const leftSide = array.splice(0, Math.ceil(array.length / 2));
			const rightSide = array;

			embed.setDescription(leftSide.join("\n"));
			const embed2 = new EmbedBuilder()
				.setColor("#ffa500")
				.setDescription(rightSide.join("\n"))
				.setTimestamp(new Date())
				.setFooter({
					text: `Tactical Squad of Random Guys`,
					iconURL: bot.user.avatarURL({ dynamic: true }),
				});
			await interaction.followUp({ embeds: [embed, embed2], ephemeral: true });
		}
	},
};
