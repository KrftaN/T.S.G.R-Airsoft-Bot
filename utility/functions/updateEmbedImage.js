module.exports.updateEmbedImage = async (bot, channelId, messageId, link) => {
	bot.channels
		.fetch(channelId)
		.then((channel) => {
			channel.messages
				.fetch(messageId)
				.then((interaction) => {
					console.log(interaction.embeds[0].image.url);

					const imageToUpdate = interaction.embeds[0].image.url;
					imageToUpdate.value = link;
					interaction.edit({
						embeds: [interaction.embeds[0]],
					});
				})
				.catch(console.error);
		})
		.catch(console.error);
};
