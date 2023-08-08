const {
	spelanmälningarDataByUniqueId,
} = require("../../utility/database-functions/spelanmälning/spelanmälningarDataByUniqueId");
const { updateSpelanmälan } = require("../../utility/database-functions/spelanmälning/updateSpelanmälan");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "ADMINISTRATIVA_VERKTYG_REDIGERA",
	async execute(interaction, bot) {
		const uniqueId = interaction.customId.split(" ")[1];
		const datum = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_DATUM");
		const pris = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_PRIS");
		const plats = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_PLATS");
		const länk = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_LÄNK");
		const beskrivning = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_BESKRIVNING");

		const { channelId, messageId, anmälda } = await spelanmälningarDataByUniqueId(uniqueId);

		await updateSpelanmälan(
			bot,
			channelId,
			messageId,
			datum,
			pris,
			plats,
			länk,
			beskrivning,
			uniqueId,
			anmälda.length
		);

		await interaction.update({
			embeds: [new EmbedBuilder().setTitle("Spelanmälming redigerad!").setColor("#00FF00")],
			components: [],
		});
	},
};
