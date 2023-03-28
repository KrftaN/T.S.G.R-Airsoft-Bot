module.exports.handleEvents = (bot, eventsFolder) => {
	for (const files of eventsFolder) {
		const event = require(`../../events/${files}`);
		if (event.once) {
			bot.once(event.name, (...args) => event.execute(...args, bot));
		} else {
			bot.on(event.name, (...args) => event.execute(...args, bot));
		}
	}
	return;
};
