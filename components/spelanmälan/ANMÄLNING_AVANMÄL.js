const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	StringSelectMenuBuilder,
	EmbedBuilder,
} = require("discord.js");
const { findDuplicateObjects } = require("../../utility/functions/findDuplicateObjects");
const {
	spelanmälningarData,
} = require("../../utility/database-functions/spelanmälning/spelanmälningarData");
module.exports = {
	name: "ANMÄLNING_AVANMÄL",
	async execute(interaction, bot) {
		const modal = new ModalBuilder()
			.setCustomId("ANMÄLNING_AVANMÄL_MODAL")
			.setTitle("Är du säker att du vill avanmäla dig?");

		const row = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("AVANMÄLAN_SVAR")
				.setLabel("Skriv 'AVANMÄL' om du vill avanmäla dig.")
				.setStyle(TextInputStyle.Short)
				.setPlaceholder("AVANMÄL")
		);

		const { anmälda, uniqueId } = await spelanmälningarData(interaction.message.id);
		const duplicates = await findDuplicateObjects(anmälda, interaction.user.id);

		if (
			!anmälda.find((obj) => {
				if (obj.userId == interaction.user.id) return true;
			})
		)
			return await interaction.reply({
				embeds: [new EmbedBuilder().setTitle("Du är inte anmäld!").setColor("#FF0000")],
				ephemeral: true,
			});
		if (duplicates.length > 1) {
			const selectMenu = new StringSelectMenuBuilder()
				.setCustomId(`ANMÄLNING_AVANMÄL_SELECTMENU ${uniqueId}`)
				.setPlaceholder("Välj ett namn")
				.addOptions(duplicates.map((obj) => ({ label: obj.name, value: obj.name })));
			const row = new ActionRowBuilder().addComponents(selectMenu);
			return await interaction.reply({
				embeds: [new EmbedBuilder().setTitle("Vem vill du avanmäla?").setColor("#ffa500")],
				ephemeral: true,
				components: [row],
			});
		}

		modal.addComponents(row);
		await interaction.showModal(modal);
	},
};
