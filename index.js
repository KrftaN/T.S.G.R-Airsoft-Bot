const Discord = ({ Client, GatewayIntentBits, Partials, Intents } = require("discord.js"));
const bot = new Client({
	intents: Object.keys(GatewayIntentBits).map((a) => {
		return GatewayIntentBits[a];
	}),
	partials: [Partials.Channel, Partials.Message, Partials.Reaction, Partials.User],
	disableEveryone: false,
});
const { token } = require("./jsonFiles/config.json");
const fs = require("fs");
const NodeCache = require("node-cache");
bot.login(token);
bot.cooldowns = new Discord.Collection();
bot.userCache = new NodeCache();
bot.reactionRoleCache = new NodeCache();

const { handleEvents } = require("./src/handlers/handleEvents");
const eventsFolder = fs.readdirSync("./events");

handleEvents(bot, eventsFolder);
