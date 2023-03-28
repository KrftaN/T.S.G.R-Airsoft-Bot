const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	name: "ping",
	data: new SlashCommandBuilder().setName("ping").setDescription("Svarar med server latency."),
	async execute(interaction, bot) {
		await interaction.reply(`🏓 | Latency is: **${Date.now() - interaction.createdTimestamp}ms!**`);
	},
};
