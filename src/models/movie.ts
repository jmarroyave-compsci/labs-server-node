import mongoose from 'mongoose';


const Movie = new mongoose.Schema({
	id: String,
	title: { type: String, required: true},
	plot: String,
	description: String,
	country: [ String ],
	type: String,
	genre: [ String ],
	duration: String,
	classification: String,
	language: String,
	releasedDate: Date,
	endedDate: Date,
	rating: [ { 
		name: String,
		averageRating: String,
		votes: Number,		
	} ], 
	remakes: [],
	streamBy: [ { 
		name: String,
		yearAdded: Number,		
	} ], 
	awards: [ { 
		festival:  { type: mongoose.Schema.Types.ObjectId, ref: 'Festival' }, 
		year: Number,
		category: String,
		won: Boolean,
		film: String,
	} ], 

	image: {
		poster: 	String,
	},
	boxOffice: 	String,
	production: String,
	website: 		String,

	directors: 	[ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ], 
	cast: 			[ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],
	writers: 		[ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],
	crew: 			[ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],

	created: 		{ type: Number, default: Date.now()},
}, { 
	collection: 'movie',
	timestamps: false,
})

Movie.virtual('references').get(function() {
  return {
  	imdb: `https://www.imdb.com/title/${this.id}/`
  }
});

Movie.index({ id: 1, title: 1 }, { unique: true })
Movie.index({ title: 1 }, { unique: false })
Movie.index({'awards.0': 1}, {partialFilterExpression: {'awards.0': {$exists: true}}});

export default mongoose.model("movie", Movie);