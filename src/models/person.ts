import mongoose from 'mongoose';

const Person = new mongoose.Schema({
	_id: String,
	name: { type: String, required: true},
	birthDate: Date,
	deathDate: Date,
	profession: [ String ],
	awards: [ {  
		festival: { type: String, ref: 'festival' }, 
		year: Number,
		category: String,
		won: Boolean,
		film: String,
	} ], 

	directed: 	[{
		id: { type: String, ref: 'movie' }, 
	}], 
	produced: 	[{
		id: { type: String, ref: 'movie' }, 
	}], 
	wrote: 	[{
		id: { type: String, ref: 'movie' }, 
	}], 
	acted: 	[{
		id: { type: String, ref: 'movie' },
		as: String, 
	}], 
	crew: 	[{
		id: { type: String, ref: 'movie' },
		cat: String,
		job: String,
		as: String, 
	}], 
	
	created: { type: Number, default: Date.now()},
}, { 
	collection: 'person',
	timestamps: false,
})


export default mongoose.model("person", Person);