import mongoose from 'mongoose';

const TV = new mongoose.Schema({
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

	image: {
		poster: String,
	},
	boxOffice: String,
	production: String,
	website: String,


	directors: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ], 
	cast: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],
	writers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],
	crew: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],

	created: { type: Number, default: Date.now()},
}, { 
	collection: 'tv_show',
	timestamps: false,
})

TV.virtual('references').get(function() {
  return {
  	imdb: `https://www.imdb.com/title/${this.id}/`
  }
});

TV.index({ id: 1, title: 1 }, { unique: true })
TV.index({ title: 1 }, { unique: false })
TV.index({'awards.0': 1}, {partialFilterExpression: {'awards.0': {$exists: true}}});

export default mongoose.model("tv", TV);