import mongoose from 'mongoose';

const Game = new mongoose.Schema({
	_id: String,
	title: { type: String, required: true},
	description: String,
	country: [ String ],
	type: String,
	genre: [ String ],
	language: String,
	releaseYear: Number,
	endedYear: Number,
	rating: [ { 
		name: String,
		averageRating: String,
		votes: Number,		
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
	cast: [{
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
	collection: 'video_game',
	timestamps: false,
})

export default mongoose.model("game", Game);