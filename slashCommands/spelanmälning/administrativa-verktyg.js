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
	},
};
