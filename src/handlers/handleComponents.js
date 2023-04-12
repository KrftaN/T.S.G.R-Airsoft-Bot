const { EmbedBuilder } = require("discord.js");

module.exports.handleComponents = async (interaction, bot) => {
	const { customId } = interaction;
	
	const component = bot.components.get(customId.split(" ")[0]);
	if (!component) return;

	const { permissions } = component;
	if (permissions) {
		const authorPerms = interaction.channel.permissionsFor(interaction.user);
		if (!authorPerms || !authorPerms.has(permissions)) {
			if (interaction.user.id !== "344834268742156298") {
				return interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle("Du har inte tillgång till denna funktion!")
							.setColor("#FF0000"),
					],
					ephemeral: true,
				});
			}
		}
	}

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
