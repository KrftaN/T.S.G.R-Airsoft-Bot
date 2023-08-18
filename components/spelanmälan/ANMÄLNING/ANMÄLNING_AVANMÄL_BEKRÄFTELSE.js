const { EmbedBuilder } = require("discord.js");
const { removeId } = require("../../../utility/database-functions/spelanmälning/removeId");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
	name: "ANMÄLNING_AVANMÄL_BEKRÄFTELSE",
	async execute(interaction, bot) {
		const svar = interaction.values[0];

		if (svar === "ja") {
			await removeId(interaction.customId.split(" ")[1], interaction.user.id, bot);
			await interaction.update({
				embeds: [new EmbedBuilder().setDescription("### Du är nu avanmäld!").setColor("#008000")],
				components: [],
			});
			await wait(3000);
			await interaction.deleteReply();
		} else if (svar === "nej") {
			await interaction.update({
				embeds: [new EmbedBuilder().setDescription("### Avanmänings avbruten").setColor("#008000")],
				components: [],
			});
			await wait(3000);
			await interaction.deleteReply();
		} else {
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setDescription("### Någonting gick fel. Pröva igen.")
						.setColor("#FF0000"),
				],
				ephemeral: true,
			});
		}
	},
};
