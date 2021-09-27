const mongoose = require("mongoose")

const Podcast = mongoose.Schema({
	id: String,
	title: String,
	subtitle: String,
	feedUrl: String,
	description: String,
	summary: String,
	author: String,
	link: String,
	language: String,
	image: String,

	category: String,
	subcategory:String,
	createdDate: Date,

	created: { type: Number, default: Date.now()},
}, {
	collection: 'podcast',
	timestamps: false,
})

Podcast.index({ id: 1, title: 1 }, { unique: true })
Podcast.index({ title: 1 }, { unique: false })

export default mongoose.model("Podcast", Podcast);
