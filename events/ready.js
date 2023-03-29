const mongoose = require("mongoose");
const mongo = require("../utility/mongo.js");
const { loadCommands } = require("../src/start/loadCommands");
const { loadComponents } = require("../src/start/loadComponents");
const { cacheMessages } = require("../src/start/cacheMessages");

module.exports = {
	name: "ready",
	once: true,
	async execute(bot) {
		loadCommands(bot);
		loadComponents(bot);
		await mongo().then(() => {
			try {
				console.log("-> Connected to mongo!");
			} finally {
				mongoose.connection.close();
			}
		});

		console.log(
			`-> Connect as ${bot.user.tag}\n-> Ready on ${bot.guilds.cache.size} servers for a total of ${bot.users.cache.size} users`
		);
		bot.user.setActivity(`/help`, {
			type: "WATCHING",
		});

		//await cacheMessages(bot);
		return bot;
	},
};
