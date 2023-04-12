const {
	EmbedBuilder,
} = require("discord.js");

const { removeName } = require("../../utility/database-functions/spelanmälning/removeName");

module.exports = {
	name: "ANMÄLNING_AVANMÄL_SELECTMENU",
	async execute(interaction, bot) {
		try {
			await removeName(interaction.values[0], interaction, interaction.customId.split(" ")[1], bot);
			return interaction.update({
				embeds: [
					new EmbedBuilder()
						.setTitle(`\`${interaction.values[0]}\` är nu avanmäld!`)
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
