const mongoose = require("mongoose")

const InfoAboutSource = mongoose.Schema({
	added: String,
	url: String,
	name: String,
}, {
	collection: 'about_source',
	timestamps: false,
})


export default mongoose.model("InfoAboutSource", InfoAboutSource);
