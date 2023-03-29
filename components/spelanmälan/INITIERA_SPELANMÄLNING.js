const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
} = require("discord.js");
const { scheduleJob, RecurrenceRule } = require("node-schedule");
const { DateTime, Settings } = require("luxon");
Settings.defaultZone = "Europe/Stockholm";
const {
	startSpelanmälningar,
} = require("../../utility/database-functions/spelanmälning/startSpelanmälningar");
const { updateAnmälningEmbed } = require("../../utility/functions/updateAnmälningEmbed");
module.exports = {
	name: "INITIERA_SPELANMÄLNING",
	async execute(interaction, bot) {
		const datum = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_DATUM");
		const pris = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_PRIS");
		const plats = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_PLATS");
		const länk = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_LÄNK");
		const beskrivning = interaction.fields.getTextInputValue("STARTA_SPELANMÄLNING_BESKRIVNING");

		const datumMillies = DateTime.fromISO(
			`${new Date().getFullYear()}-${datum.split("/")[1]}-${datum.split("/")[0]}T00:00`
		).toMillis();

		const displayDate = DateTime.fromMillis(datumMillies).toLocaleString({
			month: "numeric",
			day: "numeric",
		});

		const embed = new EmbedBuilder()
			.setTitle(`Anmälning till airsoft spel`)
			.setDescription(`${beskrivning}`)
			.setThumbnail("https://i.imgur.com/AfFp7pu.png")
			.addFields(
				{
					name: "Plats",
					value: `[${plats}](${länk})`,
					inline: true,
				},
				{
					name: "Pris",
					value: `${pris}kr`,
					inline: true,
				},
				{
					name: "Datum",
					value: `${displayDate}`,
					inline: true,
				},
				{
					name: "Anatal dagar till spel",
					value: "`29 dagar`",
					inline: true,
				}
			)
			.setColor("#ffa500")
			.setFooter({
				text: "Placeholder",
				iconURL: "https://i.imgur.com/AfFp7pu.png",
			})
			.setTimestamp(new Date());

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_PREVIOUS_PAGE")
				.setStyle(ButtonStyle.Primary)
				.setDisabled(false)
				.setEmoji("⬅️"),
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_ANMÄL")
				.setLabel("Anmäl")
				.setStyle(ButtonStyle.Success)
				.setDisabled(false),
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_AVANMÄL")
				.setLabel("Avanmäl")
				.setStyle(ButtonStyle.Danger)
				.setDisabled(false),
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_NEXT_PAGE")
				.setStyle(ButtonStyle.Primary)
				.setDisabled(false)
				.setEmoji("➡️")
		);

		await interaction.reply({ components: [row], content: "@everyone", embeds: [embed] });

		const { id } = await interaction.fetchReply();

		await startSpelanmälningar(id, displayDate, datumMillies, plats, länk, beskrivning);

		const rule = new RecurrenceRule();
		rule.hour = 2;
		rule.minute = 0;
		rule.tz = "Etc/UTC";

		scheduleJob(rule, () => {
			updateAnmälningEmbed(id);
		});
	},
};
