const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
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

		const { anmälda } = await spelanmälningarData(interaction.message.id);
		const duplicates = await findDuplicateObjects(anmälda);

		if (duplicates > 1) {
			console.log(duplicates)
		}

		modal.addComponents(row);
		await interaction.showModal(modal);
	},
};
