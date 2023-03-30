const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { splitArrayIntoGroups } = require("../../utility/functions/splitArrayIntoGroups");
const { anmälningar } = require("../../utility/database-functions/spelanmälning/anmälningar");
const { extractId } = require("../../utility/functions/extractId");
const { extractCurrentPageNumber } = require("../../utility/functions/extractCurrentPageNumber");

module.exports = {
	name: "ANMÄLNING_NEXT_PAGE",
	async execute(interaction, bot) {
		const footerText = interaction.message.embeds[0].footer.text;

		const uniqueId = await extractId(footerText);
		let currentPage = Number(extractCurrentPageNumber(footerText));

		const { anmälda } = await anmälningar(uniqueId);
		const { groups, count } = await splitArrayIntoGroups(anmälda);
		const amountOfPages = Math.ceil(count / 3);

		if (currentPage + 1 > amountOfPages)
			return interaction.reply({
				embeds: [
					new EmbedBuilder().setTitle("Det finns inte en förgående sida!").setColor("#FF0000"),
				],
				ephemeral: true,
			});

		currentPage += 1;

		const embed = new EmbedBuilder()
			.setTitle(`Anmälda spelare:`)
			.setThumbnail("https://i.imgur.com/AfFp7pu.png")
			.addFields(
				{
					name: "Spelare",
					value: `${
						groups[0 + 3 * (currentPage - 1)] ? groups[0 + 3 * (currentPage - 1)].join("\n") : "-"
					}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${
						groups[1 + 3 * (currentPage - 1)] ? groups[1 + 3 * (currentPage - 1)].join("\n") : "-"
					}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${
						groups[2 + 3 * (currentPage - 1)] ? groups[2 + 3 * (currentPage - 1)].join("\n") : "-"
					}`,
					inline: true,
				}
			)
			.setColor("#ffa500")
			.setFooter({
				text: `Sida ${currentPage} av ${amountOfPages} | id: ${uniqueId}`,
				iconURL: "https://i.imgur.com/AfFp7pu.png",
			})
			.setTimestamp(new Date());
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_PREVIOUS_PAGE")
				.setLabel("Förra sidan")
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(false)
				.setEmoji("⬅️"),
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_NEXT_PAGE")
				.setStyle(ButtonStyle.Secondary)
				.setLabel("Nästa sida")
				.setDisabled(false)
				.setEmoji("➡️")
		);

		await interaction.update({ components: [row], embeds: [embed], ephemeral: true });
	},
};
