const deploy = require("./deploy");
const Discord = require("discord.js");
const fs = require("fs");

module.exports.loadCommands = async (bot) => {
	bot.slashCommands = new Discord.Collection();
	bot.slashCommandAndFolders = new Object();

	const slashCommandFolders = fs.readdirSync("./slashCommands");

	await deploy.deploy(bot).then(() => {
		console.log("Loading slash commands...");
		for (const folder of slashCommandFolders) {
			const slashCommandFiles = fs
				.readdirSync(`./slashCommands/${folder}`)
				.filter((file) => file.endsWith(".js"));
			for (const file of slashCommandFiles) {
				const command = require(`../../slashCommands/${folder}/${file}`);
				bot.slashCommands.set(command.data.name, command);

				console.log(`-> Loaded command ${command.data.name}`);

				if (!bot.slashCommandAndFolders[folder]) {
					bot.slashCommandAndFolders[folder] = new Array();
				}

				bot.slashCommandAndFolders[folder].push(command.name);
			}
		}
	});
	console.log("\n");
	return bot;
};
