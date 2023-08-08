const {EmbedBuilder } = require("discord.js");

module.exports.updateEmbedImage = async (bot, channelId, messageId, link) => {
	bot.channels
		.fetch(channelId)
		.then((channel) => {
			channel.messages
				.fetch(messageId)
				.then((interaction) => {
					const embed = EmbedBuilder.from(interaction.embeds[0]).setImage(link);
					interaction.edit({
						embeds: [embed],
					});
				})
				.catch(console.error);
		})
		.catch(console.error);
};
