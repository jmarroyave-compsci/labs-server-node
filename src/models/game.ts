import mongoose from 'mongoose';

const Game = new mongoose.Schema({
	id: String,
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
	collection: 'game',
	timestamps: false,
})

Game.index({ id: 1, title: 1 }, { unique: true })
Game.index({ title: 1 }, { unique: false })

export default mongoose.model("game", Game);