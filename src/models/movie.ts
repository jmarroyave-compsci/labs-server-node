const mongoose = require("mongoose")

const Movie = mongoose.Schema({
	id: String,
	title: String,
	originalTitle: String,
	description: String,
	country: [ String ],
	type: String,
	genre: [ String ],
	duration: String,
	rating: String,
	releasedDate: Date,
	endedDate: Date,
	streamBy: [ [String, Date] ],

	directors: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],
	cast: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],
	writers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],

	created: { type: Number, default: Date.now()},
}, {
	collection: 'movie',
	timestamps: false,
})

Movie.index({ id: 1, title: 1 }, { unique: true })

export default mongoose.model("movie", Movie);
