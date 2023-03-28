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
	name: "starta-spelanmälan",
	creator: false,
	permissions: "ADMINISTRATOR",
	data: new SlashCommandBuilder()
		.setName("starta-spelanmälan")
		.setDescription("Starta spelanmälan för Airsoftspel.")
		.addStringOption((option) => {
			return (option = option.setName("titel").setDescription("Spelets titel.").setRequired(true));
		})
		.addStringOption((option) => {
			return (option = option.setName("datum").setDescription("Format: DD/MM").setRequired(true));
		}),
	async execute(interaction, bot) {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("primary")
				.setLabel("Click me!")
				.setStyle(ButtonStyle.Primary)
				.setDisabled(false)
				.setEmoji("⏹️")
		);

		await interaction.reply({ content: "I think you should,", components: [row] });
	},
};
