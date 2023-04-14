const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports.updateSpelanmälanEmbed = async (
	bot,
	channelId,
	messageId,
	datum,
	pris,
	plats,
	länk,
	beskrivning,
	messageUniqueId,
	totalAnmälda
) => {
	bot.channels
		.fetch(channelId)
		.then((channel) => {
			channel.messages
				.fetch(messageId)
				.then((interaction) => {
					const row = new ActionRowBuilder().addComponents(
						new ButtonBuilder()
							.setCustomId(`ANMÄLNING_VISA_SPELARE ${messageUniqueId}`)
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
						.setDescription(`${beskrivning}`)
						.setThumbnail(bot.user.avatarURL({ dynamic: true }))
						.setImage("https://i.imgur.com/PfIm2sY.jpeg")
						.addFields(
							{
								name: "Plats",
								value: länk ? `[${plats}](${länk})` : `${plats}`,
								inline: true,
							},
							{
								name: "Pris",
								value: `${pris}kr`,
								inline: true,
							},
							{
								name: "Datum",
								value: `${datum}`,
								inline: true,
							},
							{ name: "Antal Anmälda Spelare", value: `${totalAnmälda}` }
						)

						.setColor("#ffa500")
						.setFooter({
							text: `Tactical Squad of Random Guys | id: ${messageUniqueId}`,
							iconURL: bot.user.avatarURL({ dynamic: true }),
						})
						.setTimestamp(new Date());

					interaction.edit({ embeds: [embed], components: [row] });
				})
				.catch(console.error);
		})
		.catch(console.error);
};
