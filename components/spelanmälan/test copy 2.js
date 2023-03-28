module.exports = {
	name: "test3",
	async execute(interaction, bot) {
		console.log(interaction);
		interaction.reply({ content: "Die!", ephemeral: true });
	},
};
