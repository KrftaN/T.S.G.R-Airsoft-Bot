const fs = require("node:fs");
const { Routes, REST } = require("discord.js");
const { guildId, token } = require("../../jsonFiles/config.json");

module.exports.deploy = async (bot) => {
	console.log(1);

	const commands = new Array();
	const CommandFolders = fs.readdirSync("./slashCommands");

	for (const folder of CommandFolders) {
		//Finds the name of the command
		const slashCommandFiles = fs
			.readdirSync(`./slashCommands/${folder}`)
			.filter((file) => file.endsWith(".js"));
		for (const file of slashCommandFiles) {
			const command = require(`../../slashCommands/${folder}/${file}`);
			commands.push(command.data.toJSON());
		}
	}

	const rest = new REST({ version: "9" }).setToken(token);

	rest
		.put(Routes.applicationGuildCommands(bot.user.id, guildId), { body: commands })
		//.put(Routes.applicationGuildCommands(bot.user.id, "1090731877977043095"), { body: commands })
		.then(() => console.log("-> Successfully registered application commands."))
		.catch(console.error);
};
	/* 	rest
		.delete(
			Routes.applicationGuildCommand(
				"1089835656861204551",
				"982697978059960361",
				"1091445702137217116"
			)
		)
		.then(() => console.log("Successfully deleted guild command"))
		.catch(console.error);

	// for global commands
	rest
		.delete(Routes.applicationCommand("1089835656861204551", "1091662430205136918"))
		.then(() => console.log("Successfully deleted application command"))
		.catch(console.error); */

/* const fs = require("node:fs");
const { Routes, REST } = require("discord.js");
const { guildId, token } = require("../../jsonFiles/config.json");

module.exports.deploy = async (bot) => {
	const commands = new Array();
	const CommandFolders = fs.readdirSync("./slashCommands");

	for (const folder of CommandFolders) {
		//Finds the name of the command
		const slashCommandFiles = fs
			.readdirSync(`./slashCommands/${folder}`)
			.filter((file) => file.endsWith(".js"));
		for (const file of slashCommandFiles) {
			const command = require(`../../slashCommands/${folder}/${file}`);
			commands.push(command.data.toJSON());
		}
	}

	const rest = new REST({ version: "9" }).setToken(token);

	rest
		.put(Routes.applicationCommands(bot.user.id), { body: commands })
		.then(() => console.log("Successfully registered application commands."))
		.catch(console.error);
};
 */
/* module.exports.deploy = async (bot) => {
	const { Routes, REST } = require("discord.js");
	const { guildId, token } = require("../../jsonFiles/config.json");

	const rest = new REST({ version: "9" }).setToken(token);
	rest.get(Routes.applicationCommands(bot.user.id)).then((data) => {
		const promises = [];
		for (const command of data) {
			const deleteUrl = `${Routes.applicationCommands(bot.user.id)}/${command.id}`;
			promises.push(rest.delete(deleteUrl));
		}
		return Promise.all(promises);
	});
}; */
