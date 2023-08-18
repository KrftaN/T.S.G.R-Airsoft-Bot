const { EmbedBuilder } = require("discord.js");
const {
	deleteSpelanmälning,
} = require("../../../utility/database-functions/spelanmälning/deleteSpelanmälning");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
	name: "ADMINISTRATIVA_VERKTYG_AVSLUTA_SPELANMÄLAN_BEKRÄFTELSE",
	async execute(interaction, bot) {
		const uniqueId = interaction.customId.split(" ")[1];
		const svar = interaction.values[0];

		if (svar === "ja") {
			const { channelId, messageId } = await deleteSpelanmälning(uniqueId);

			bot.channels
				.fetch(channelId)
				.then((channel) => {
					channel.messages
						.fetch(messageId)
						.then((interaction) => {
							interaction.delete();
						})
						.catch(console.error);
				})
				.catch(console.error);

			interaction.update({
				embeds: [
					new EmbedBuilder().setDescription("### Spelanmälning avslutad!").setColor("#008000"),
				],
				components: [],
			});
		} else if (svar === "nej") {
			await interaction.update({
				embeds: [new EmbedBuilder().setDescription("### Avslutan avbruten!").setColor("#008000")],
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
