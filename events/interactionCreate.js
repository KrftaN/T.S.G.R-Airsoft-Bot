const { handleCommands } = require("../src/handlers/handleCommands");
const { handleComponents } = require("../src/handlers/handleComponents");

module.exports = {
	name: "interactionCreate",
	async execute(interaction, bot) {
		const { commandName } = interaction;

		if (!interaction.isCommand() && !interaction.isButton()) return;
		if (interaction.isButton()) {
			handleComponents(interaction, bot);
		}

		const slashCommand = bot.slashCommands.get(commandName);
		if (!slashCommand) return;

		handleCommands(slashCommand, bot, interaction);
	},
};
