const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	ModalBuilder,
	TextInputStyle,
	TextInputBuilder,
} = require("discord.js");
const { splitArrayIntoGroups } = require("../../utility/functions/splitArrayIntoGroups");

module.exports = {
	name: "test",
	creator: true,
	data: new SlashCommandBuilder().setName("test").setDescription("test"),
	async execute(interaction, bot) {
		global.currentPage = new Object();

		global.currentPage[interaction.user.id] = 1;

		const names = [
			"Emma Smith",
			"William Johnson",
			"Olivia Brown",
			"Noah Davis",
			"Ava Wilson",
			"James Garcia",
			"Isabella Martinez",
			"Ethan Anderson",
			"Sophia Taylor",
			"Mason Thomas",
			"Charlotte Lee",
			"Jacob Perez",
			"Amelia Robinson",
			"Benjamin Jackson",
			"Mia Green",
			"Michael Baker",
			"Abigail Reed",
			"Elijah Nelson",
			"Elizabeth Hill",
			"Daniel Adams",
			"Evelyn Campbell",
			"Matthew Parker",
			"Harper Evans",
			"Logan Edwards",
			"Grace Collins",
			"Lucas Stewart",
			"Chloe Flores",
			"Jackson Morris",
			"Madison Sanchez",
			"Alexander Rogers",
			"Emily Phillips",
			"Carter Cooper",
			"Avery Torres",
			"Ryan Peterson",
			"Lily Ramirez",
			"Luke Wright",
			"Natalie Foster",
			"Owen Howard",
			"Aria Carter",
			"William Hughes",
			"Audrey Diaz",
		];

		const { groups } = await splitArrayIntoGroups(names);
		const amountOfPages = Math.ceil(count / 15);

		const embed = new EmbedBuilder()
			.setTitle(`Anmälda spelare:`)
			//.setDescription(`${array1.join("\n")} ${array1.join("\n")} ${array1.join("\n")}`)
			.setThumbnail("https://i.imgur.com/AfFp7pu.png")
			.addFields(
				{
					name: "Spelare",
					value: `${groups[0].join("\n")}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${groups[1].join("\n")}`,
					inline: true,
				},
				{
					name: "Spelare",
					value: `${groups[2].join("\n")}`,
					inline: true,
				}
			)
			.setColor("#ffa500")
			.setFooter({
				text: `Sida ${global.currentPage[interaction.user.id]} av ${amountOfPages}`,
				iconURL: "https://i.imgur.com/AfFp7pu.png",
			})
			.setTimestamp(new Date());
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_PREVIOUS_PAGE")
				.setLabel("Förra sidan")
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(false)
				.setEmoji("⬅️"),
			new ButtonBuilder()
				.setCustomId("ANMÄLNING_NEXT_PAGE")
				.setStyle(ButtonStyle.Secondary)
				.setLabel("Nästa sida")
				.setDisabled(false)
				.setEmoji("➡️")
		);

		await interaction.reply({ components: [row], embeds: [embed], ephemeral: true });
	},
};
//users2.join("\n")
