const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

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

		modal.addComponents(row);

		await interaction.showModal(modal);
	},
};
