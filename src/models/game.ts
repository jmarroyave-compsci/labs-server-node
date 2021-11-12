import mongoose from 'mongoose';

const Game = new mongoose.Schema({
	_id: String,
	title: { type: String, required: true},
	description: String,
	country: [ String ],
	type: String,
	genre: [ String ],
	language: String,
	releasedDate: Date,
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

	crew: [ { type: mongoose.Schema.Types.ObjectId, ref: 'person' } ],

	created: { type: Number, default: Date.now()},
}, { 
	collection: 'video_game',
	timestamps: false,
})

export default mongoose.model("game", Game);