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
		bot.channels
			.fetch("1086716757256974407")
			.then((channel) => {
				channel.messages
					.fetch("1099382172542058576")
					.then((interaction) => {
						console.log(interaction.embeds[0].image.url);

						/* const fieldName = "Antal Anmälda Spelare";
						const fieldToUpdate = interaction.embeds[0].image.url;
						fieldToUpdate.value = "";
						interaction.edit({
							embeds: [interaction.embeds[0]],
						}); */
					})
					.catch(console.error);
			})
			.catch(console.error);
	},
};
//users2.join("\n")
