const mongo = require("../../mongo");
const anmälningSchema = require("../../../schemas/anmälningSchema");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

module.exports.spelanmälningarData = async (messageId) => {
	return await mongo().then(async (mongoose) => {
		console.log("I'm here");

		try {
			const result = await anmälningSchema.findOne({
				messageId,
			});

			return result;
		} finally {
			mongoose.connection.close();
		}
	});
};
