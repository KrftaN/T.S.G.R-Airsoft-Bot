const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	UserSelectMenuBuilder,
	EmbedBuilder,
} = require("discord.js");
const {
	spelanmälningarDataByUniqueId,
} = require("../../utility/database-functions/spelanmälning/spelanmälningarDataByUniqueId");

module.exports = {
	name: "ADMINISTRATIVA_VERKTYG_SELECTMENU",
	async execute(interaction, bot) {
		const { anmälda, datum, beskrivning, plats, länk, pris } = await spelanmälningarDataByUniqueId(
			interaction.customId.split(" ")[1]
		);

		if (interaction.values[0] === "ADMINISTRATIVA_VERKTYG_REDIGERA") {
			const modal = new ModalBuilder()
				.setCustomId("ADMINISTRATIVA_VERKTYG_REDIGERA")
				.setTitle("Redigera spelanmälningen");

			const secondRow = new ActionRowBuilder().addComponents(
				new TextInputBuilder()
					.setCustomId("STARTA_SPELANMÄLNING_DATUM")
					.setLabel("Spelets datum. Format: DD/MM.")
					.setValue(datum)
					.setPlaceholder("DD/MM")
					.setStyle(TextInputStyle.Short)
			);
			const thirdRow = new ActionRowBuilder().addComponents(
				new TextInputBuilder()
					.setCustomId("STARTA_SPELANMÄLNING_PRIS")
					.setPlaceholder("Pris")
					.setValue(pris)
					.setLabel("OBS lägg inte till 'KR' efter priset!")
					.setStyle(TextInputStyle.Short)
			);
			const fourthRow = new ActionRowBuilder().addComponents(
				new TextInputBuilder()
					.setCustomId("STARTA_SPELANMÄLNING_PLATS")
					.setLabel("Plats.")
					.setValue(plats)
					.setPlaceholder("Plats")
					.setStyle(TextInputStyle.Short)
			);

			const fifthRow = new ActionRowBuilder().addComponents(
				new TextInputBuilder()
					.setCustomId("STARTA_SPELANMÄLNING_LÄNK")
					.setLabel("Google Map länk.")
					.setValue(länk)
					.setPlaceholder("Länk")
					.setRequired(false)
					.setStyle(TextInputStyle.Short)
			);

			const sixthRow = new ActionRowBuilder().addComponents(
				new TextInputBuilder()
					.setCustomId("STARTA_SPELANMÄLNING_BESKRIVNING")
					.setPlaceholder("Beskrivning")
					.setValue(beskrivning)
					.setMaxLength(2000)
					.setLabel("Beskrivning till spelet.")
					.setStyle(TextInputStyle.Paragraph)
			);

			modal.addComponents(secondRow, thirdRow, fourthRow, fifthRow, sixthRow);

			await interaction.showModal(modal);
		} else if (interaction.values[0] === "ADMINISTRATIVA_VERKTYG_AVANMÄL") {
			if (anmälda.length.length === 0)
				return interaction.update({
					embeds: [new EmbedBuilder().setTitle("Det finns inga anmälda!").setColor("#FF0000")],
					components: [],
				});

			const selectMenu = new UserSelectMenuBuilder()
				.setCustomId(`ADMINISTRATIVA_VERKTYG_AVANMÄL ${interaction.customId.split(" ")[1]}`)
				.setPlaceholder("Användare");

			const row = new ActionRowBuilder().addComponents(selectMenu);

			return interaction.update({
				embeds: [new EmbedBuilder().setTitle("Vem/vilka vill du avanmäla?").setColor("#ffa500")],
				components: [row],
			});
		}
	},
};
