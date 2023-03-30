const { EmbedBuilder } = require("discord.js");
const { removeId } = require("../../utility/database-functions/spelanmälning/removeId");

module.exports = {
	name: "ANMÄLNING_AVANMÄL_MODAL",
	async execute(interaction, bot) {
		const svar = interaction.fields.getTextInputValue("AVANMÄLAN_SVAR");

		if (svar.toLowerCase() === "avanmäl") {
			try {
				await removeId(interaction.message.id, interaction.user.id);
				await interaction.reply({
					embeds: [new EmbedBuilder().setTitle("Du är nu avanmäld!").setColor("#00ff00")],
					ephemeral: true,
				});
			} catch (e) {
				console.log(e);
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle("Någonting gick fel. Är du säker på att du är anmäld?")
							.setColor("#FF0000"),
					],
					ephemeral: true,
				});
			}
		} else {
			await interaction.reply({
				embeds: [
					new EmbedBuilder().setTitle("Någonting gick fel. Pröva igen.").setColor("#FF0000"),
				],
				ephemeral: true,
			});
		}
	},
};
