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

		const embed = new EmbedBuilder()
			.setTitle(`Påskpel`)
			.setDescription("Påskspel den 7/7. Spelstart kl 9")
			.addFields(
				{
					name: "Plats",
					value: `[Grimarp](https://discordapp.com/oauth2/authorize?client_id=439778986050977792&scope=bot&permissions=8)`,
					inline: true,
				},
				{
					name: "Pris",
					value: `25`,
					inline: true,
				},
				{
					name: "Datum",
					value: `7/7`,
					inline: true,
				}
			)
			.setColor("#ffa500")
			.setTimestamp(new Date());

		await interaction.reply({ content: "I think you should,", components: [row], embeds: [embed] });
	},
};
