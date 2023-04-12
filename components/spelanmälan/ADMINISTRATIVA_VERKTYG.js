const {
	ActionRowBuilder,
	StringSelectMenuBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js");
module.exports = {
	name: "ADMINISTRATIVA_VERKTYG",
	permissions: PermissionFlagsBits.Administrator,
	async execute(interaction, bot) {
		const uniqueId = interaction.values[0];

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
				}
			);
		const row = new ActionRowBuilder().addComponents(selectMenu);
		return await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle("Vilket administrativt verktyg vill du använda?")
					.setColor("#ffa500"),
			],
			ephemeral: true,
			components: [row],
		});
	},
};
