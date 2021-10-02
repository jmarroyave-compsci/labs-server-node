const mongoose = require("mongoose")

const Info = mongoose.Schema({
	db: {
		version : String
	},
	created: { type: Number, default: Date.now()},
}, {
	collection: '_',
	timestamps: false,
})

export default mongoose.model("Info", Info);
