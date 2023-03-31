module.exports.updatePlayerCount = async (interaction, add) => {
	const playerCount = Number(interaction.message.embeds[0].fields[3].value);
	const fieldName = "Antal Anmälda Spelare";
	const fieldToUpdate = interaction.message.embeds[0].fields.find((f) => f.name === fieldName);
	fieldToUpdate.value = add ? playerCount + 1 : playerCount - 1;
	await interaction.message.edit({
		embeds: [interaction.message.embeds[0]],
	});
};
