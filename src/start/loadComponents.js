const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports.loadComponents = async (bot) => {
	bot.components = new Discord.Collection();
	bot.componentAndFolders = {};

	const topLevelFolders = fs.readdirSync("./components");

	console.log("Loading components...");

	try {
		for (const topLevelFolder of topLevelFolders) {
			const secondLevelFolders = fs
				.readdirSync(path.join("./components", topLevelFolder), { withFileTypes: true })
				.filter((dirent) => dirent.isDirectory())
				.map((dirent) => dirent.name);

			for (const secondLevelFolder of secondLevelFolders) {
				const componentFiles = fs
					.readdirSync(path.join("./components", topLevelFolder, secondLevelFolder))
					.filter((file) => file.endsWith(".js"));

				for (const file of componentFiles) {
					const command = require(path.join(
						"../../components",
						topLevelFolder,
						secondLevelFolder,
						file
					));
					bot.components.set(command.name, command);

					console.log(`-> Loaded component ${command.name}`);

					if (!bot.componentAndFolders[topLevelFolder]) {
						bot.componentAndFolders[topLevelFolder] = [];
					}

					bot.componentAndFolders[topLevelFolder].push(command.name);
				}
			}
		}

		console.log("\n");
		return bot;
	} catch (error) {
		console.error("An error occurred:", error);
		return bot;
	}
};
