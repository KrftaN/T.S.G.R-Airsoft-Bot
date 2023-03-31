module.exports.handleComponents = async (interaction, bot) => {
	const { customId } = interaction;

	console.log(customId);

	const component = bot.components.get(customId.split(" ")[0]);
	try {
		await component.execute(interaction, bot);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this component!",
			ephemeral: true,
		});
	}
};
