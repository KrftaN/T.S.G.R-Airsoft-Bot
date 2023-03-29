const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");

module.exports = {
	name: "ANMÄLNING_ANMÄL",
	async execute(interaction, bot) {
		const modal = new ModalBuilder().setCustomId("ANMÄLNING_ANMÄL_MODAL").setTitle("Anmälan");

		const row = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("ANMÄLAN_NAMN")
				.setLabel("Ditt namn samt eventuellt lag:")
				.setStyle(TextInputStyle.Short)
		);

		modal.addComponents(row);

		await interaction.showModal(modal);
	},
};
