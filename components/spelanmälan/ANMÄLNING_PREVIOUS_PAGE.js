const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { splitArrayIntoGroups } = require("../../utility/functions/splitArrayIntoGroups");
const { anmälningar } = require("../../utility/database-functions/spelanmälning/anmälningar");
const { extractId } = require("../../utility/functions/extractId");
const { extractCurrentPageNumber } = require("../../utility/functions/extractCurrentPageNumber");

module.exports = {
	name: "ANMÄLNING_PREVIOUS_PAGE",
	async execute(interaction, bot) {
		const footerText = interaction.message.embeds[0].footer.text;

		const uniqueId = await extractId(footerText);
		let currentPage = Number(extractCurrentPageNumber(footerText));

		const { anmälda } = await anmälningar(uniqueId);
		const { groups, count } = await splitArrayIntoGroups(anmälda);
		const amountOfPages = Math.ceil(count / 3);

		if (currentPage - 1 === 0)
			return interaction.reply({
				embeds: [
					new EmbedBuilder().setTitle("Det finns inte en föregående sida!").setColor("#FF0000"),
				],
				ephemeral: true,
			});

		currentPage -= 1;

		const embed = new EmbedBuilder()
			.setTitle(`Anmälda spelare:`)
			.setThumbnail(bot.user.avatarURL({ dynamic: true }))
			.addFields(
				{
					name: "Spelare",
					value: `${
						groups[0 + 3 * (currentPage - 1)]
							? groups[0 + 3 * (currentPage - 1)]
									.map((name, index) => `${index + 1 + (currentPage - 1) * 15}. ${name}`)
									.join("\n")
							: "-"
					}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${
						groups[1 + 3 * (currentPage - 1)]
							? groups[1 + 3 * (currentPage - 1)]
									.map((name, index) => `${index + 6 + (currentPage - 1) * 15}. ${name}`)
									.join("\n")
							: "-"
					}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${
						groups[2 + 3 * (currentPage - 1)]
							? groups[2 + 3 * (currentPage - 1)]
									.map((name, index) => `${index + 11 + (currentPage - 1) * 15}. ${name}`)
									.join("\n")
							: "-"
					}`,
					inline: true,
				}
			)
			.setColor("#ffa500")
			.setFooter({
				text: `Sida ${currentPage} av ${amountOfPages} | id: ${uniqueId}`,
				iconURL: bot.user.avatarURL({ dynamic: true }),
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
