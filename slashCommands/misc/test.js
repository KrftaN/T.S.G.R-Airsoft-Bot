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
					.fetch("1125321884947468338")
					.then((interaction) => {
						const row = new ActionRowBuilder().addComponents(
							new ButtonBuilder()
								.setCustomId(`ANMÄLNING_VISA_SPELARE jmiqowuw7`)
								.setStyle(ButtonStyle.Secondary)
								.setDisabled(false)
								.setLabel("Anmälda spelare"),
							new ButtonBuilder()
								.setCustomId("ANMÄLNING_ANMÄL")
								.setLabel("Anmäl")
								.setStyle(ButtonStyle.Success)
								.setDisabled(false),
							new ButtonBuilder()
								.setCustomId("ANMÄLNING_AVANMÄL")
								.setLabel("Avanmäl")
								.setStyle(ButtonStyle.Danger)
								.setDisabled(false)
						);

						const embed = new EmbedBuilder()
							.setTitle(`Anmälning till airsoft spel`)
							.setDescription("Vi kör en spelanmälan inför helgens spel")
							.setThumbnail(bot.user.avatarURL({ dynamic: true }))
							.setImage("https://i.imgur.com/jb0hBj2.jpeg")
							.addFields(
								{
									name: "Plats",
									value: `[Grimarp](https://www.google.com/maps/place/56%C2%B046'06.7%22N+14%C2%B004'12.4%22E/@56.7685318,14.0695446,218m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0xfb0ab86c97b6b575!7e2!8m2!3d56.7685307!4d14.0701103?shorturl=1)`,
									inline: true,
								},
								{
									name: "Pris",
									value: `50kr`,
									inline: true,
								},
								{
									name: "Datum",
									value: `08/07`,
									inline: true,
								},
								{ name: "Antal Anmälda Spelare", value: "21" }
							)

							.setColor("#ffa500")
							.setFooter({
								text: `Tactical Squad of Random Guys | id: jmiqowuw7`,
								iconURL: bot.user.avatarURL({ dynamic: true }),
							})
							.setTimestamp(new Date());

						interaction.edit({
							embeds: [embed],
							components: [row],
						});
					})
					.catch(console.error);
			})
			.catch(console.error);
	},
};
//users2.join("\n")
