const { EmbedBuilder } = require("discord.js");
const { addId } = require("../../utility/database-functions/spelanmälning/addId");

module.exports = {
	name: "ANMÄLNING_ANMÄL_MODAL",
	async execute(interaction, bot) {
		console.log(interaction.message.id);

		const namn = interaction.fields.getTextInputValue("ANMÄLAN_NAMN");

		await addId(interaction.message.id, interaction.user.id, namn)

		await interaction.reply({
			embeds: [new EmbedBuilder().setTitle("Du är nu anmäld!").setColor("#00ff00")],
			ephemeral: true,
		});

		console.log(namn);
	},
};
