const {
	spelanmälningarDataByUniqueId,
} = require("../../utility/database-functions/spelanmälning/spelanmälningarDataByUniqueId");
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { findDuplicateObjects } = require("../../utility/functions/findDuplicateObjects");

module.exports = {
	name: "ADMINISTRATIVA_VERKTYG_AVANMÄL",
	async execute(interaction, bot) {
		const uniqueId = interaction.customId.split(" ")[1];
		const { anmälda } = await spelanmälningarDataByUniqueId(uniqueId);
		const duplicates = findDuplicateObjects(anmälda, interaction.values[0]);

		const users = interaction.users.entries().next().value;
		if (duplicates.length === 0)
			return interaction.update({
				embeds: [
					new EmbedBuilder()
						.setTitle(
							`${users[1].username}#${users[1].discriminator} har inte anmält några spelare!`
						)
						.setColor("#FF0000"),
				],
				ephemeral: true,
				components: [],
			});

		const row = new ActionRowBuilder().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId(`ADMINISTRATIVA_VERKTYG_AVANMÄL_SELECTMENU ${uniqueId}`)
				.setPlaceholder("Välj ett namn")
				.setMaxValues(duplicates.length)
				.addOptions(duplicates.map((obj) => ({ label: obj.name, value: obj.name })))
		);
		return await interaction.reply({
			embeds: [
				new EmbedBuilder().setTitle("Vem/vilka spelare vill du avanmäla?").setColor("#ffa500"),
			],
			ephemeral: true,
			components: [row],
		});
	},
};
