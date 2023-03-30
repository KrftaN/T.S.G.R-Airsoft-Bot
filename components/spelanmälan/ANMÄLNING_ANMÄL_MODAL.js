const { EmbedBuilder } = require("discord.js");
const { addId } = require("../../utility/database-functions/spelanmälning/addId");
const { shuffleArray } = require("../../utility/functions/shuffleArray");
const names = require("../../jsonFiles/Names.json");
const wait = require("node:timers/promises").setTimeout;
module.exports = {
	name: "ANMÄLNING_ANMÄL_MODAL",
	async execute(interaction, bot) {
		const namn = interaction.fields.getTextInputValue("ANMÄLAN_NAMN");
		const interactionToSend = interaction;

		if (namn.split(" ")[0].toLowerCase() === "dummydata") {
			await interaction.deferReply();

			const shuffledNames = await shuffleArray(names);
			for (let i = 0; i < Number(namn.split(" ")[1]); i++) {
				console.log(i);

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
			embeds: [new EmbedBuilder().setTitle("Du är nu anmäld!").setColor("#00ff00")],
			ephemeral: true,
		});
	},
};
