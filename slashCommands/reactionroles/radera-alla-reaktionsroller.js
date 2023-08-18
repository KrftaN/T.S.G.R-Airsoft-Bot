const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const {
	deleteManyReactionRoles,
} = require("../../utility/database-functions/reactionroles/deleteManyReactionRoles");
const {
	reactionRoleInformation,
} = require("../../utility/database-functions/reactionroles/reactionRoleInformation");
const { cacheMessages } = require("../../src/start/cacheMessages");

module.exports = {
	name: "radera-alla-reaktionsroller",
	creator: false,
	admin: true,
	permissions: "MANAGE_ROLES",
	data: new SlashCommandBuilder()
		.setName("radera-alla-reaktionsroller")
		.setDescription("Raderar alla aktiva reaktionsroller i servern") // BOOLEAN
		.addBooleanOption((option) => {
			return (option = option
				.setName("radera")
				.setDescription("Välj om du vill radera alla originalmeddelanden eller inte.")
				.setRequired(false));
		}),
	async execute(interaction, bot) {
		await interaction.deferReply();
		await cacheMessages(bot).then(async () => {
			const { options } = interaction;
			const deleteBoolean = options.getBoolean("radera");
			const allMessageIds = await reactionRoleInformation();
			let guildMessageUniqueIds = new Array();
			let guildMessages = new Array();

			await Promise.all(
				allMessageIds.map(async (message) => {
					if (message.guild === interaction.guild.id) {
						guildMessageUniqueIds.push(message.uniqueId);
						guildMessages.push(message);
					}
				})
			);

			if (deleteBoolean === true) {
				guildMessages.forEach(async (reactionRoleMessage) => {
					const msg = await bot.guilds.cache
						.get(reactionRoleMessage.guild)
						.channels.cache.get(reactionRoleMessage.channel)
						.messages.fetch(reactionRoleMessage.id);

					msg.delete();
				});
			}
			await deleteManyReactionRoles(guildMessageUniqueIds);
			const embed = new EmbedBuilder()
				.setTitle("Rensat alla reaktionsroller!")
				.setColor("#ffa500")
				.setTimestamp(new Date())
				.setFooter({
					text: `Tactical Squad of Random Guys`,
					iconURL: bot.user.avatarURL({ dynamic: true }),
				});

			await interaction.followUp({ embeds: [embed], ephemeral: true });
		});
	},
};
