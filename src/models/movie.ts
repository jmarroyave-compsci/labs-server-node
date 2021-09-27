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
	classification: String,
	releasedDate: Date,
	endedDate: Date,
	rating: [ {
		name: String,
		averageRating: Number,
		votes: Number,
	} ],
	streamBy: [ {
		name: String,
		yearAdded: Number,
	} ],
	awards: [ {
		name: { type : String, index: true},
		year: Number,
		category: String,
		won: Boolean,
	} ],

	directors: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],
	cast: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],
	writers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],

	created: { type: Number, default: Date.now()},

	references : {
		imdb: { type: String, default: function(){
				return `https://www.imdb.com/title/${this.id}/`
			},
		},
	},


}, {
	collection: 'movie',
	timestamps: false,
})

Movie.index({ id: 1, title: 1 }, { unique: true })
Movie.index({ title: 1 }, { unique: false })

export default mongoose.model("movie", Movie);
