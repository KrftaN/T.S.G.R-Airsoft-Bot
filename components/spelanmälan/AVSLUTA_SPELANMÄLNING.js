const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

const {
	deleteSpelanmälning,
} = require("../../utility/database-functions/spelanmälning/deleteSpelanmälning");

module.exports = {
	name: "AVSLUTA_SPELANMÄLNING",
	async execute(interaction, bot) {
		const uniqueId = interaction.values[0];
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
			embeds: [new EmbedBuilder().setTitle("Spelanmälning avslutad!").setColor("#00FF00")],
			components: [],
		});
	},
};
