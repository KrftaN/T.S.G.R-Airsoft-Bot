const { EmbedBuilder } = require("discord.js");

module.exports.handleReactionRoles = (roleId, guildId, user, bot) => {
	try {
		const role = bot.guilds.cache.get(guildId).roles.cache.find((role) => role.id === roleId);
		const member = bot.guilds.cache.get(guildId).members.cache.get(user.id);

		if (member.roles.cache.some((role) => role.id === roleId)) {
			const embed = new EmbedBuilder()
				.setTitle("Roll ändrad!")
				.setColor("#ffa500")
				.setDescription(
					`<:minusbutcoolest:983670417522843698> \`${role.name}\` rollen har nu tagits bort från ditt konto!`
				)
				.setTimestamp(new Date())
				.setFooter({
					text: `Tactical Squad of Random Guys`,
					iconURL: bot.user.avatarURL({ dynamic: true }),
				});

			member.send({ embeds: [embed] });

			member.roles.remove(role);
		} else {
			const embed = new EmbedBuilder()
				.setTitle("Roll ändrad!")
				.setColor("#ffa500")
				.setDescription(
					`<:plus:983666900401807370> \`${role.name}\` rollen har nu lagts till ditt konto!`
				)
				.setTimestamp(new Date())
				.setFooter({
					text: `Tactical Squad of Random Guys`,
					iconURL: bot.user.avatarURL({ dynamic: true }),
				});

			member.send({ embeds: [embed] });
			member.roles.add(role);
		}
	} catch (err) {
		console.log(err);
	}
};
