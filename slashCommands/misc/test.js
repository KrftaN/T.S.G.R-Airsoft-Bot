const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	Events,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
	name: "test",
	creator: true,
	data: new SlashCommandBuilder().setName("test").setDescription("test"),
	async execute(interaction, bot) {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("test")
				.setStyle(ButtonStyle.Primary)
				.setDisabled(false)
				.setEmoji("⏹️")
		);

		await interaction.reply({ content: "I think you should,", components: [row] });
	},
};
