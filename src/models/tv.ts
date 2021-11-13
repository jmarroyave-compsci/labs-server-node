import mongoose from 'mongoose';

const TV = new mongoose.Schema({
	_id: String,
	title: { type: String, required: true},
	plot: String,
	description: String,
	country: [ String ],
	type: String,
	genre: [ String ],
	duration: String,
	classification: String,
	language: String,
	releaseYear: Number,
	endedYear: Number,
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
		festival:  { type: String, ref: 'festival' }, 
		year: Number,
		category: String,
		won: Boolean,
		film: String,
	} ], 

	image: {
		poster: String,
	},
	boxOffice: String,
	production: String,
	website: String,


	directed: 	[{
		id: { type: String, ref: 'person' }, 
	}], 
	produced: 	[{
		id: { type: String, ref: 'person' }, 
	}], 
	written: 	[{
		id: { type: String, ref: 'person' }, 
	}], 
	cast: 	[{
		id: { type: String, ref: 'person' },
		as: String, 
	}], 
	crew: 	[{
		id: { type: String, ref: 'person' },
		cat: String,
		job: String,
		as: String, 
	}], 

	created: { type: Number, default: Date.now()},
}, { 
	collection: 'tv_show',
	timestamps: false,
})


export default mongoose.model("tv", TV);