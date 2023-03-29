const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");

module.exports = {
	name: "starta-spelanmälan",
	creator: false,
	permissions: "ADMINISTRATOR",
	data: new SlashCommandBuilder()
		.setName("starta-spelanmälan")
		.setDescription("Initiera spelanmälning."),
	async execute(interaction, bot) {
		const modal = new ModalBuilder()
			.setCustomId("INITIERA_SPELANMÄLNING")
			.setTitle("Initiera spelanmälning");

		const secondRow = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("STARTA_SPELANMÄLNING_DATUM")
				.setLabel("Spelets datum. Format: DD/MM.")
				.setPlaceholder("DD/MM")
				.setStyle(TextInputStyle.Short)
		);
		const thirdRow = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("STARTA_SPELANMÄLNING_PRIS")
				.setPlaceholder("Pris")
				.setLabel("OBS lägg inte till 'KR' efter priset!")
				.setStyle(TextInputStyle.Short)
		);
		const fourthRow = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("STARTA_SPELANMÄLNING_PLATS")
				.setLabel("Plats")
				.setPlaceholder("Plats")
				.setStyle(TextInputStyle.Short)
		);

		const fifthRow = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("STARTA_SPELANMÄLNING_LÄNK")
				.setLabel("Google Map länk")
				.setPlaceholder("Länk")
				.setStyle(TextInputStyle.Short)
		);

		const sixthRow = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("STARTA_SPELANMÄLNING_BESKRIVNING")
				.setPlaceholder("Beskrivning")
				.setLabel("Beskrivning till spelet.")
				.setStyle(TextInputStyle.Paragraph)
		);

		modal.addComponents(secondRow, thirdRow, fourthRow, fifthRow, sixthRow);

		await interaction.showModal(modal);
	},
};
