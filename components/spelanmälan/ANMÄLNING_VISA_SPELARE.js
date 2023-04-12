const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { splitArrayIntoGroups } = require("../../utility/functions/splitArrayIntoGroups");
const {
	spelanmälningarData,
} = require("../../utility/database-functions/spelanmälning/spelanmälningarData");

module.exports = {
	name: "ANMÄLNING_VISA_SPELARE",
	async execute(interaction, bot) {
		const { anmälda, uniqueId } = await spelanmälningarData(interaction.message.id);

		const { groups, count } = await splitArrayIntoGroups(anmälda);
		const amountOfPages = Math.ceil(count / 3);

		const embed = new EmbedBuilder()
			.setTitle(`Anmälda spelare:`)
			.setThumbnail(bot.user.avatarURL({ dynamic: true }))
			.addFields(
				{
					name: "Spelare",
					value: `${
						groups[0] ? groups[0].map((name, index) => `${index + 1}. ${name}`).join("\n") : "-"
					}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${
						groups[1] ? groups[1].map((name, index) => `${index + 6}. ${name}`).join("\n") : "-"
					}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${
						groups[2] ? groups[2].map((name, index) => `${index + 11}. ${name}`).join("\n") : "-"
					}`,
					inline: true,
				}
			)
			.setColor("#ffa500")
			.setFooter({
				text: `Sida ${1} av ${amountOfPages} | id: ${uniqueId}`,
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

		await interaction.reply({ components: [row], embeds: [embed], ephemeral: true });
	},
};
