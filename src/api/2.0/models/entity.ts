import mongoose from 'mongoose';

const Entity = new mongoose.Schema({
	_id: String,
	title: { type: String, required: true},
	plot: String,
	description: String,
	countries: [ String ],
	type: String,
	genres: [ String ],
	duration: Number,
	classification: String,
	language: String,
	releaseYear: Number,
	startYear: Number,
	endedYear: Number,
	ratings: [ { 
		entity: String,
		rating: String,
		votes: Number,		
	} ], 
	remakes: [],
	streamBy: [ { 
		name: String,
		yearAdded: Number,		
	} ], 
	awards: [ { 
		festival:  { type: String, ref: 'festival_2' }, 
		year: Number,
		category: String,
		won: Boolean,
		film: String,
	} ], 
	image: {
		poster: String,
	},
	boxOffice: 	String,
	production: String,
	website: 	String,
	directed: 	[{
		id: { type: String, ref: 'person_2' }, 
	}], 
	produced: 	[{
		id: { type: String, ref: 'person_2' }, 
	}], 
	written: 	[{
		id: { type: String, ref: 'person_2' }, 
	}], 
	cast: 	[{
		id: { type: String, ref: 'person_2' },
		as: String, 
	}], 
	crew: 	[{
		id: { type: String, ref: 'person_2' },
		cat: String,
		job: String,
		as: String, 
	}], 
}, { 
	collection: 'entity',
	timestamps: false,
})

export default mongoose.model("entity_2", Entity);