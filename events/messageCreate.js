//const { prefix, mongoPath } = require("../jsonFiles/config.json");
//const Levels = require("discord-xp");
const { Collection, Permissions } = require("discord.js");
const mongo = require("../utility/mongo.js");

module.exports = {
	name: "messageCreate",
	async execute(message, bot) {
		//console.log(message.content);

		if (message.author.bot || message.channel.type === "DM") return;

		try {
			/* await mongo().then(async () => {
				Levels.setURL(mongoPath);

				const randomAmountOfXp = Math.floor(Math.random() * 20) + 1; // Min 1, Max 20
				const hasLeveledUp = await Levels.appendXp(
					message.author.id,
					message.guild.id,
					randomAmountOfXp
				);
				if (hasLeveledUp) {
					const user = await Levels.fetch(message.author.id, message.guild.id);
					message.channel.send(
						`${message.author}, congratulations! You have leveled up to **${user.level}** in \`${message.guild.name}\` :sunglasses:`
					);
				}
			}); */
		} catch (err) {
			console.log(err);
		}
	},
};
