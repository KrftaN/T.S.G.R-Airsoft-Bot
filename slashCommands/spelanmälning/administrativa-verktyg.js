const {
	SlashCommandBuilder,
	ActionRowBuilder,
	PermissionFlagsBits,
	StringSelectMenuBuilder,
	EmbedBuilder,
} = require("discord.js");
const {
	getSpelanmälningUniqueIds,
} = require("../../utility/database-functions/spelanmälning/getSpelanmälningUniqueIds");

module.exports = {
	name: "administrativa-verktyg",
	creator: false,
	data: new SlashCommandBuilder()
		.setName("administrativa-verktyg")
		.setDescription("Vertyg för att administrera spelanmälning.")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, bot) {
		const documents = await getSpelanmälningUniqueIds(interaction.guild.id);

		if (documents.length === 1) {
			const uniqueId = documents[0].uniqueId;

			const selectMenu = new StringSelectMenuBuilder()
				.setCustomId(`ADMINISTRATIVA_VERKTYG_SELECTMENU ${uniqueId}`)
				.setPlaceholder("Administrativt Verktyg")
				.addOptions(
					{
						label: "Redigera spelanmälningen",
						value: "ADMINISTRATIVA_VERKTYG_REDIGERA",
					},
					{
						label: "Avanmäl spelare",
						value: "ADMINISTRATIVA_VERKTYG_AVANMÄL",
					},
					{
						label: "Uppdatera bild",
						value: "ADMINISTRATIVA_VERKTYG_UPPDATERA_BILD",
					},
					{
						label: "Avsluta spelanmälan",
						value: "ADMINISTRATIVA_VERKTYG_AVSLUTA_SPELANMÄLAN",
					}
				);
			const row = new ActionRowBuilder().addComponents(selectMenu);
			return await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle("Vilket administrativt verktyg vill du använda?")
						.setColor("#ffa500"),
				],
				ephemeral: true,
				components: [row],
			});
		} else {
			const selectMenu = new StringSelectMenuBuilder()
				.setCustomId("ADMINISTRATIVA_VERKTYG")
				.setPlaceholder("Spelanmälningens ID")
				.addOptions(documents.map((obj) => ({ label: obj.uniqueId, value: obj.uniqueId })));
			const row = new ActionRowBuilder().addComponents(selectMenu);

			return interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(`Vilken spelanmälning vill du administrera?`)
						.setColor("#ffa500"),
				],
				components: [row],
				ephemeral: true,
			});
		}
	},
};
