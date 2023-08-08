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
		const { userCache } = bot;

		userCache.set("test", 1);

		console.log(userCache.get("test"));

		interaction.reply({ content: "@everyone", allowedMentions: { parse: ["everyone"] } });
	},
};
//users2.join("\n")
