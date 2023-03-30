const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	EmbedBuilder,
} = require("discord.js");
const {
	spelanmälningarData,
} = require("../../utility/database-functions/spelanmälning/spelanmälningarData");

module.exports = {
	name: "ANMÄLNING_ANMÄL",
	async execute(interaction, bot) {
		console.log(interaction.message.id);

		const modal = new ModalBuilder().setCustomId("ANMÄLNING_ANMÄL_MODAL").setTitle("Anmälan");

		const row = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("ANMÄLAN_NAMN")
				.setLabel("Ditt namn samt eventuellt lag:")
				.setStyle(TextInputStyle.Short)
		);
		const { anmälda } = await spelanmälningarData(interaction.message.id);
		if (
			anmälda.find((obj) => {
				if (obj.userId == interaction.user.id) return true;
			})
		)
			return await interaction.reply({
				embeds: [new EmbedBuilder().setTitle("Du är redan anmäld!").setColor("#FF0000")],
				ephemeral: true,
			});

		modal.addComponents(row);
		await interaction.showModal(modal);
	},
};
