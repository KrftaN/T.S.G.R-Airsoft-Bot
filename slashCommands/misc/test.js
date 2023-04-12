const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	ModalBuilder,
	TextInputStyle,
	TextInputBuilder,
} = require("discord.js");
const { splitArrayIntoGroups } = require("../../utility/functions/splitArrayIntoGroups");

module.exports = {
	name: "test",
	creator: true,
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Endast för 'development' ändamål."),
	async execute(interaction, bot) {
		await interaction.reply({ content: "@everyone" });
	},
};
//users2.join("\n")
