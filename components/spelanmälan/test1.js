module.exports = {
	name: "test1",
	async execute(interaction, bot) {
        console.log(interaction);
        interaction.reply({ content: "Die!", ephemeral: true });
	},
};