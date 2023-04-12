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
		const { anmälda, uniqueId } = await spelanmälningarData(interaction.message.id);
		if (
			!anmälda.find((obj) => {
				if (obj.userId == interaction.user.id) return true;
			})
		)
			return await interaction.reply({
				embeds: [new EmbedBuilder().setTitle("Du är inte anmäld!").setColor("#FF0000")],
				ephemeral: true,
			});

		const duplicates = await findDuplicateObjects(anmälda, interaction.user.id);
		if (duplicates.length > 1) {
			const row = new ActionRowBuilder().addComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`ANMÄLNING_AVANMÄL_SELECTMENU ${uniqueId}`)
					.setPlaceholder("Välj ett namn")
					.addOptions(duplicates.map((obj) => ({ label: obj.name, value: obj.name })))
			);
			return await interaction.reply({
				embeds: [new EmbedBuilder().setTitle("Vem vill du avanmäla?").setColor("#ffa500")],
				ephemeral: true,
				components: [row],
			});
		}
		const modal = new ModalBuilder()
			.setCustomId("ANMÄLNING_AVANMÄL_MODAL")
			.setTitle("Är du säker att du vill avanmäla dig?");

		modal.addComponents(
			new ActionRowBuilder().addComponents(
				new TextInputBuilder()
					.setCustomId("AVANMÄLAN_SVAR")
					.setLabel("Skriv 'AVANMÄL' om du vill avanmäla dig.")
					.setStyle(TextInputStyle.Short)
					.setPlaceholder("AVANMÄL")
			)
		);
		await interaction.showModal(modal);
	},
};
