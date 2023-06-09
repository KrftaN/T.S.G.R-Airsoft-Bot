const { Collection } = require("discord.js");
module.exports.handleCommands = async (slashCommand, bot, interaction) => {
	const botPerms = interaction.channel.permissionsFor(bot.user);
	if (!botPerms.has("ADMINISTRATOR"))
		return interaction.reply({
			content: `❌ This bot needs \`ADMINISTRATOR permissions\` to function properly, please reinvite the bot with the \`ADMINISTRATOR box ticked.\``,
		});

	if (slashCommand.permissions) {
		const authorPerms = interaction.channel.permissionsFor(interaction.user);
		if (!authorPerms || !authorPerms.has(slashCommand.permissions)) {
			if (interaction.user.id !== "344834268742156298") {
				return interaction.reply({
					content: `You do not have the necessary permissions to execute this command! [Missing permission(s): ${slashCommand.permissions}]`,
					ephemeral: true,
				});
			}
		}
	}

	if (slashCommand.creator === true && interaction.user.id !== "344834268742156298")
		return interaction.reply({
			content: "Endast bot skaparen skall använda detta kommando.",
			ephemeral: true,
		});

	const { cooldowns } = bot;

	if (!cooldowns.has(slashCommand.name)) {
		cooldowns.set(slashCommand.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(slashCommand.name);
	const cooldownAmount = (slashCommand.cooldown ?? 1) * 1000;

	if (timestamps.has(interaction.user.id)) {
		const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return interaction.reply({
				content: `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${
					slashCommand.name
				}\` command.`,
				ephemeral: true,
			});
		}
	}

	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

	try {
		await slashCommand.execute(interaction, bot);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this slashCommand!",
			ephemeral: true,
		});
	}
};
