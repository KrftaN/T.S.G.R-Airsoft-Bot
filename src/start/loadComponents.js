const Discord = require("discord.js");
const fs = require("fs");

module.exports.loadComponents = async (bot) => {
	bot.components = new Discord.Collection();
	bot.componentAndFolders = new Object();

	const componentFolders = fs.readdirSync("./components");

	console.log("Loading slash commands...");
	for (const folder of componentFolders) {
		const componentFiles = fs
			.readdirSync(`./components/${folder}`)
			.filter((file) => file.endsWith(".js"));
		for (const file of componentFiles) {
			const command = require(`../../components/${folder}/${file}`);
			bot.components.set(command.name, command);

			console.log(`-> Loaded command ${command.name}`);

			if (!bot.componentAndFolders[folder]) {
				bot.componentAndFolders[folder] = new Array();
			}

			bot.componentAndFolders[folder].push(command.name);
		}
	}

	console.log("\n");
	return bot;
};
