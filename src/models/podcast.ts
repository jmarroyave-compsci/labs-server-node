import mongoose from 'mongoose';

const Podcast = new mongoose.Schema({
	_id: String,
	title: { type: String, required: true},
	subtitle: String,
	feedUrl: String,
	description: String,
	summary: String,
	author: String,
	link: String,
	language: String,
	country: String,
	image: {
		poster: String,
	},
	category: String,
	subcategory:String,
	createdDate: Date,

	created: { type: Number, default: Date.now()},
}, { 
	collection: 'podcast',
	timestamps: false,
})

export default mongoose.model("Podcast", Podcast);