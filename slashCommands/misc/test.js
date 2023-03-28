const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	Events,
} = require("discord.js");
const schedule = require("node-schedule");
const { DateTime, Settings } = require("luxon");
Settings.defaultZone = "Europe/Stockholm";

module.exports = {
	name: "test",
	creator: true,
	data: new SlashCommandBuilder().setName("test").setDescription("test"),
	/*.addStringOption((option) => {
			return (option = option.setName("titel").setDescription("Spelets titel.").setRequired(true));
		})
		.addStringOption((option) => {
			return (option = option.setName("datum").setDescription("Format: DD/MM").setRequired(true));
		}).addStringOption((option) => {
			return (option = option.setName("beskrivning").setDescription("Lägg till eventuell extra information om evenemanget.").setRequired(true));
		})
		.addStringOption((option) => {
			return (option = option.setName("pris").setDescription("Pris till airsoftspelet.").setRequired(true));
		}).addStringOption((option) => {
			return (option = option.setName("plats").setDescription("Plats för airsoftspelet.").setRequired(true));
		}).addStringOption((option) => {
			return (option = option.setName("google-map-länk").setDescription("Lägg till eventuell google map länk för platsen.").setRequired(false));
		}), */ async execute(interaction, bot) {
		const datumInput = "11/03"; //options.getString("datum");
		const titel = "Påskspel"; //options.getString("titel");
		const pris = "25"; //options.getString("pris");
		const beskrivning = "Påskspel den 7/7. Spelstart kl 9"; //options.getString("beskrivning");
		const plats = "grimarp"; //options.getString("plats");
		const googleMapLänk =
			"https://www.google.com/maps/place/T.S.R.G+Airsoft/@56.7716145,14.0624222,17z/data=!3m1!4b1!4m6!3m5!1s0x465129e64428cd65:0xc4bcdf44b0e9ce91!8m2!3d56.7716116!4d14.0646109!16s%2Fg%2F11t9w3k40z"; //options.getString("google-map-länk")

		const datum = DateTime.fromISO(
			`${new Date().getFullYear()}-${datumInput.split("/")[1]}-${datumInput.split("/")[0]}T00:00`
		).toMillis();

		const displayDate = DateTime.fromMillis(datum).toLocaleString({
			month: "numeric",
			day: "numeric",
		});

		const embed = new EmbedBuilder()
			.setTitle(`${titel}`)
			.setDescription(`${beskrivning}`)
			.setThumbnail("https://i.imgur.com/AfFp7pu.png")
			.addFields(
				{
					name: "Plats",
					value: `[${plats}](${googleMapLänk})`,
					inline: true,
				},
				{
					name: "Pris",
					value: `${pris}`,
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
				text: "Använd: /anmäl för att anmäla dig till nästa spel.",
				iconURL: "https://i.imgur.com/AfFp7pu.png",
			})
			.setTimestamp(new Date());

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("test")
				.setStyle(ButtonStyle.Primary)
				.setDisabled(false)
				.setEmoji("⏹️")
		);

		const rule = new schedule.RecurrenceRule();
		rule.hour = 2;
		rule.minute = 0;
		rule.tz = "Etc/UTC";

		schedule.scheduleJob(rule, function () {
			console.log("A new day has begun in the UTC timezone!");
		});

		await interaction.reply({ components: [row], embeds: [embed] });
	},
};
//users2.join("\n")
