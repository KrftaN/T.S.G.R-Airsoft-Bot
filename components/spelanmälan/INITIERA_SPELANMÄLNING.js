const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { uniqueId } = require("../../utility/functions/uniqueId");
const { removeNonDigits } = require("../../utility/functions/removeNonDigits");
const { halveString } = require("../../utility/functions/halveString");
const {
	startSpelanmälningar,
} = require("../../utility/database-functions/spelanmälning/startSpelanmälningar");
module.exports = {
	name: "INITIERA_SPELANMÄLNING",
	async execute(interaction, bot) {
		const datum = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_DATUM");
		const pris = removeNonDigits(interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_PRIS"));
		const plats = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_PLATS");
		const länk = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_LÄNK");
		const beskrivning = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_BESKRIVNING");
		const messageUniqueId = await halveString(uniqueId());

		const embed = new EmbedBuilder()
			.setTitle(`Anmälning till airsoft spel`)
			.setDescription(`${beskrivning}`)
			.setThumbnail(bot.user.avatarURL({ dynamic: true }))
			.setImage("https://i.imgur.com/PfIm2sY.jpeg")
			.addFields(
				{
					name: "Plats",
					value: länk ? `[${plats}](${länk})` : `${plats}`,
					inline: true,
				},
				{
					name: "Pris",
					value: `${pris}kr`,
					inline: true,
				},
				{
					name: "Datum",
					value: `${datum}`,
					inline: true,
				},
				{ name: "Antal Anmälda Spelare", value: "0" }
			)

			.setColor("#ffa500")
			.setFooter({
				text: `Tactical Squad of Random Guys | id: ${messageUniqueId}`,
				iconURL: bot.user.avatarURL({ dynamic: true }),
			})
			.setTimestamp(new Date());

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId(`ANMÄLNING_VISA_SPELARE ${messageUniqueId}`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(false)
				.setLabel("Anmälda spelare"),
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_ANMÄL")
				.setLabel("Anmäl")
				.setStyle(ButtonStyle.Success)
				.setDisabled(false),
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_AVANMÄL")
				.setLabel("Avanmäl")
				.setStyle(ButtonStyle.Danger)
				.setDisabled(false)
		);

		await interaction.reply({ components: [row], embeds: [embed] });
		const { id } = await interaction.fetchReply();
		await startSpelanmälningar(
			id,
			datum,
			plats,
			länk,
			pris,
			beskrivning,
			interaction.guild.id,
			interaction.channel.id,
			messageUniqueId
		);
	},
};
