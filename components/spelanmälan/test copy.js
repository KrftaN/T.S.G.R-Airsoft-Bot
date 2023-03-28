module.exports = {
	name: "test2",
	async execute(interaction, bot) {
        console.log(interaction);
        interaction.reply({ content: "Die!", ephemeral: true });
	},
};