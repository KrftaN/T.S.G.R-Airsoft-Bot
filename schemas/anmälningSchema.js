const mongoose = require("mongoose");
mongoose.pluralize(null);

const anmälningSchema = mongoose.Schema(
	{
		messageId: {
			type: String,
			required: true,
		},
		datum: {
			type: String,
			required: true,
		},
		datumMillies: {
			type: String,
			required: true,
		},
		plats: {
			type: String,
			required: true,
		},
		länk: {
			type: String,
			required: true,
		},
		beskrivning: {
			type: String,
			required: true,
		},
		anmälda: [Object],
	},

	{
		timestamps: true,
	}
);

module.exports = mongoose.model("spelanmälningar", anmälningSchema);
