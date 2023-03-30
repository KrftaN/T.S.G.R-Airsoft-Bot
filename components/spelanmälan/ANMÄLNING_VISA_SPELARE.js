const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { splitArrayIntoGroups } = require("../../utility/functions/splitArrayIntoGroups");
const { halveString } = require("../../utility/functions/halveString");
const {
	spelanmälningarData,
} = require("../../utility/database-functions/spelanmälning/spelanmälningarData");

module.exports = {
	name: "ANMÄLNING_VISA_SPELARE",
	async execute(interaction, bot) {
		const { anmälda, uniqueId } = await spelanmälningarData(interaction.message.id);

		const { groups, count } = await splitArrayIntoGroups(anmälda);
		console.log(groups);

		const amountOfPages = Math.ceil(count / 3);

		const embed = new EmbedBuilder()
			.setTitle(`Anmälda spelare:`)
			//.setDescription(`${array1.join("\n")} ${array1.join("\n")} ${array1.join("\n")}`)
			.setThumbnail("https://i.imgur.com/AfFp7pu.png")
			.addFields(
				{
					name: "Spelare",
					value: `${groups[0] ? groups[0].join("\n") : "-"}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${groups[1] ? groups[1].join("\n") : "-"}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${groups[2] ? groups[2].join("\n") : "-"}`,
					inline: true,
				}
			)
			.setColor("#ffa500")
			.setFooter({
				text: `Sida ${1} av ${amountOfPages} | id: ${uniqueId}`,
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

		await interaction.reply({ components: [row], embeds: [embed], ephemeral: true });
	},
};
