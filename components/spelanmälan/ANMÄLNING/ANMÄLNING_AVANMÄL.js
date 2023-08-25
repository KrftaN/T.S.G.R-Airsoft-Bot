const {
	ActionRowBuilder,
	StringSelectMenuOptionBuilder,
	StringSelectMenuBuilder,
	EmbedBuilder,
} = require("discord.js");
const { findDuplicateObjects } = require("../../../utility/functions/findDuplicateObjects");
const { extractId } = require("../../../utility/functions/extractId");
const {
	spelanmälningarDataByUniqueId,
} = require("../../../utility/database-functions/spelanmälning/spelanmälningarDataByUniqueId");
module.exports = {
	name: "ANMÄLNING_AVANMÄL",
	async execute(interaction, bot) {
		const uniqueId = extractId(interaction.message.embeds[0].footer.text);
		const { anmälda } = await spelanmälningarDataByUniqueId(uniqueId, bot);
		if (
			!anmälda.find((obj) => {
				if (obj.userId == interaction.user.id) return true;
			})
		)
			return await interaction.reply({
				embeds: [new EmbedBuilder().setTitle("Du är inte anmäld!").setColor("#FF0000")],
				ephemeral: true,
			});

		const duplicates = await findDuplicateObjects(anmälda, interaction.user.id);
		if (duplicates.length > 1) {
			const row = new ActionRowBuilder().addComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`ANMÄLNING_AVANMÄL_SELECTMENU ${uniqueId}`)
					.setPlaceholder("Vem vill du avanmäla?")
					.setMaxValues(duplicates.length)
					.addOptions(duplicates.map((obj) => ({ label: obj.name, value: obj.name })))
			);
			return await interaction.reply({
				ephemeral: true,
				components: [row],
			});
		}

		const row = new ActionRowBuilder().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId(`ANMÄLNING_AVANMÄL_BEKRÄFTELSE ${uniqueId}`)
				.setPlaceholder("Är du säker på att du vill avanmäla dig?")
				.addOptions(
					new StringSelectMenuOptionBuilder().setLabel("Ja").setValue("ja"),
					new StringSelectMenuOptionBuilder().setLabel("Nej").setValue("nej")
				)
		);
		return await interaction.reply({
			ephemeral: true,
			components: [row],
		});
	},
};
