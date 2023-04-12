const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "ping",
	data: new SlashCommandBuilder().setName("ping").setDescription("Svarar med server latency."),
	async execute(interaction, bot) {
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle(`🏓 | Latency is: **${interaction.createdTimestamp - Date.now()}ms!**`)
					.setColor("#ffa500"),
			],
			ephemeral: true,
		});
	},
};
