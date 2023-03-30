module.exports.updatePlayerCount = async (interaction) => {
	const playerCount = Number(interaction.message.embeds[0].fields[3].value);

	interaction.message.embeds[0].fields.find((f) => f.name === "Antal Anmälda Spelare").value =
		playerCount + 1;

	interaction.message.edit({ embeds: [interaction.message.embeds[0]] }); //components: [interaction.message.components[0]]
};
