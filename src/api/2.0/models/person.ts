import mongoose from 'mongoose';

const Person = new mongoose.Schema({
	_id: String,
	name: { type: String, required: true},
	birthYear: Number,
	deathYear: Number,
	profession: [ String ],
	awards: [ {  
		festival: { type: String, ref: 'festival_2' }, 
		year: Number,
		category: String,
		won: Boolean,
		film: String,
	} ], 
	directed: [{
		id: { type: String, ref: 'entity_2' }, 
	}], 
	produced: [{
		id: { type: String, ref: 'entity_2' }, 
	}], 
	wrote: [{
		id: { type: String, ref: 'entity_2' }, 
	}], 
	acted: [{
		id: { type: String, ref: 'entity_2' },
		as: String, 
	}], 
	crew: [{
		id: { type: String, ref: 'entity_2' },
		cat: String,
		job: String,
		as: String, 
	}], 
	directedTo: [{
		p: { type: String, ref: 'person_2' },
		n: Number, 
	}], 
	directedBy: [{
		p: { type: String, ref: 'person_2' },
		n: Number, 
	}], 
	actedWith: [{
		p: { type: String, ref: 'person_2' },
		n: Number, 
	}], 
}, { 
	collection: 'person',
	timestamps: false,
})


export default mongoose.model("person_2", Person);