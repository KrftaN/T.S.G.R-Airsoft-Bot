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
	name: "avsluta-spelanmälning",
	creator: false,
	data: new SlashCommandBuilder()
		.setName("avsluta-spelanmälning")
		.setDescription("Avsluta spelanmälningen.")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, bot) {
		const documents = await getSpelanmälningUniqueIds(interaction.guild.id);

		console.log(interaction.guild.id)

		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId("AVSLUTA_SPELANMÄLNING")
			.setPlaceholder("Spelanmälningens ID")
			.addOptions(documents.map((obj) => ({ label: obj.uniqueId, value: obj.uniqueId })));
		const row = new ActionRowBuilder().addComponents(selectMenu);

		return interaction.reply({
			embeds: [
				new EmbedBuilder().setTitle("Vilken spelanmälning vill du avsluta?").setColor("#ffa500"),
			],
			components: [row],
			ephemeral: true,
		});
	},
};
