module.exports = {
	name: "test",
	async execute(interaction, bot) {
        console.log(interaction);
        interaction.reply({ content: "Die!", ephemeral: true });
	},
};