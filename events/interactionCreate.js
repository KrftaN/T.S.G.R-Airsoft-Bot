const { handleCommands } = require("../src/handlers/handleCommands");
const { handleComponents } = require("../src/handlers/handleComponents");

module.exports = {
	name: "interactionCreate",
	async execute(interaction, bot) {
		const { commandName } = interaction;

		if (!interaction.isCommand() && !interaction.isButton() && !interaction.isModalSubmit()) return;

		if (interaction.isButton() || interaction.isModalSubmit()) {
			handleComponents(interaction, bot);
		}

		const slashCommand = bot.slashCommands.get(commandName);
		if (slashCommand) return handleCommands(slashCommand, bot, interaction);
	},
};
