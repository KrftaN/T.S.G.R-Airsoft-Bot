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
	name: "anmäl",
	creator: false,
	data: new SlashCommandBuilder()
		.setName("anmäl")
		.setDescription("Anmälning till nästkommande Airsoftspel.")
		.addStringOption((option) => {
			return (option = option.setName("namn").setDescription("Ditt namn.").setRequired(true));
		})
		.addStringOption((option) => {
			return (option = option
				.setName("lag")
				.setDescription("Lägg till eventuellt lag.")
				.setRequired(false));
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
