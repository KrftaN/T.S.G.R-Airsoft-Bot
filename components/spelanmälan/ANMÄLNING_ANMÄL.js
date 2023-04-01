const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	EmbedBuilder,
} = require("discord.js");
const { addId } = require("../../utility/database-functions/spelanmälning/addId");
const { shuffleArray } = require("../../utility/functions/shuffleArray");
const names = require("../../jsonFiles/Names.json");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
	name: "ANMÄLNING_ANMÄL",
	async execute(interaction, bot) {
		console.log(interaction.message.id);

		if (interaction.isModalSubmit()) {
			const namn = interaction.fields.getTextInputValue("ANMÄLAN_NAMN");
			const interactionToSend = interaction;

			if (namn.split(" ")[0].toLowerCase() === "dummydata") {
				await interaction.deferReply();

				const shuffledNames = await shuffleArray(names);
				for (let i = 0; i < Number(namn.split(" ")[1]); i++) {
					await addId(
						interaction.message.id,
						shuffledNames[i].id,
						shuffledNames[i].namn,
						interactionToSend
					);
				}
				await interaction.followUp({
					embeds: [
						new EmbedBuilder().setTitle("Dummy data successfully inserted!").setColor("#00ff00"),
					],
				});
				await wait(2500);
				return await interaction.deleteReply();
			}

			await addId(interaction.message.id, interaction.user.id, namn, interactionToSend);

			await interaction.reply({
				embeds: [new EmbedBuilder().setTitle(`\`${namn}\` har blivit anmäld.`).setColor("#00ff00")],
				ephemeral: true,
			});
		} else {
			const modal = new ModalBuilder().setCustomId("ANMÄLNING_ANMÄL").setTitle("Anmälan");

			const row = new ActionRowBuilder().addComponents(
				new TextInputBuilder()
					.setCustomId("ANMÄLAN_NAMN")
					.setMaxLength(30)
					.setLabel("Ditt namn samt eventuellt lag:")
					.setStyle(TextInputStyle.Short)
			);

			modal.addComponents(row);
			await interaction.showModal(modal);
		}
	},
};
