const mongoose = require("mongoose")

const Search = mongoose.Schema({
	entity: String,
	text: String,
	ref: String,
}, {
	collection: 'search_index',
	timestamps: false,
})

Search.index({ text : "text"})

export default mongoose.model("search", Search);
