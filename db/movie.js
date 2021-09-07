const mongoose = require("mongoose")

const Movie = mongoose.Schema({
	title: String,
	description: String,
	country: [ String ],
	type: { type: String, enum: [ 'Movie', 'TV Show' ] },
	genre: [ String ],
	duration: String,
	rating: String,
	released_date: Date,
	added_date: Date,
	director: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ], 
	cast: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],
}, { collection: 'movie' })

module.exports = mongoose.model("movie", Movie);