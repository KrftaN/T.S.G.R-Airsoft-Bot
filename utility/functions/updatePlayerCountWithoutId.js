module.exports.updatePlayerCountWithoutId = async (interactionData, add, messageId, bot) => {
	bot.channels
		.fetch(interactionData.message.channelId)
		.then((channel) => {
			channel.messages
				.fetch(messageId)
				.then((interaction) => {
					const playerCount = Number(interaction.embeds[0].fields[3].value);
					const fieldName = "Antal Anmälda Spelare";
					const fieldToUpdate = interaction.embeds[0].fields.find((f) => f.name === fieldName);
					fieldToUpdate.value = add ? playerCount + 1 : playerCount - 1;
					interaction.edit({
						embeds: [interaction.embeds[0]],
					});
				})
				.catch(console.error);
		})
		.catch(console.error);
};
