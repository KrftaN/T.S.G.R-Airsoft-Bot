module.exports.updatePlayerCount = async (interaction) => {
	const playerCount = Number(interaction.message.embeds[0].fields[4].value);

	const newEmbed = (interaction.message.embeds[0].fields[4].value = playerCount + 1);

	//interaction.update({ embeds: [newEmbed] });
};
