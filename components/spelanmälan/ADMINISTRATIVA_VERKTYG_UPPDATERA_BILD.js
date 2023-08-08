const {
	getSpelanmälningByUniqueId,
} = require("../../utility/database-functions/spelanmälning/getSpelanmälningByUniqueId");
const { updateEmbedImage } = require("../../utility/functions/updateEmbedImage");
const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "ADMINISTRATIVA_VERKTYG_UPPDATERA_BILD",
	async execute(interaction, bot) {
		const uniqueId = interaction.customId.split(" ")[1];
		const { channelId, messageId } = await getSpelanmälningByUniqueId(uniqueId);
		const länk = interaction.fields.getTextInputValue("LÄNK");
		await updateEmbedImage(bot, channelId, messageId, länk);
		interaction.update({
			embeds: [
				new EmbedBuilder().setDescription("## Uppdatering verkställd.").setColor("#008000"),
			],
			ephemeral: true,
			components: [],
		});
	},
};
