const { EmbedBuilder } = require("discord.js");
const { removeSeveralNames } = require("../../utility/database-functions/spelanmälning/removeSeveralNames");

module.exports = {
	name: "ANMÄLNING_AVANMÄL_SELECTMENU",
	async execute(interaction, bot) {
		try {
			await removeSeveralNames(interaction.values, interaction.customId.split(" ")[1], bot);
			return interaction.update({
				embeds: [
					new EmbedBuilder()
						.setTitle(`\`${interaction.values.join(", ")}\` är nu avanmäld!`)
						.setColor("#00FF00"),
				],
				components: [],
			});
		} catch (e) {
			console.log(e);
			interaction.update({
				embeds: [new EmbedBuilder().setTitle("Någonting gick fel!").setColor("#FF0000")],
				components: [],
			});
		}
	},
};
