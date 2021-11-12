import mongoose from 'mongoose';

const Person = new mongoose.Schema({
	_id: String,
	name: { type: String, required: true},
	birthDate: Date,
	deathDate: Date,
	profession: [ String ],
	awards: [ {  
		festival: { type: mongoose.Schema.Types.ObjectId, ref: 'festival' }, 
		year: Number,
		category: String,
		won: Boolean,
		film: String,
	} ], 

	directed: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ], 
	acted: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ], 
	wrote: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ], 
	crew: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ], 
	
	created: { type: Number, default: Date.now()},
}, { 
	collection: 'person',
	timestamps: false,
})


export default mongoose.model("person", Person);