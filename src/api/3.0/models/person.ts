import mongoose from 'mongoose';

const Person = new mongoose.Schema({
	_id: String,
	name: { type: String, required: true},
	birthYear: Number,
	deathYear: Number,
	profession: [ String ],
	awards: [ {  
		festival: { type: String, ref: 'festival_3' }, 
		year: Number,
		category: String,
		won: Boolean,
		film: String,
	} ], 
	directed: [{
		id: { type: String, ref: 'entity_3' }, 
	}], 
	produced: [{
		id: { type: String, ref: 'entity_3' }, 
	}], 
	wrote: [{
		id: { type: String, ref: 'entity_3' }, 
	}], 
	acted: [{
		id: { type: String, ref: 'entity_3' },
		as: String, 
	}], 
	crew: [{
		id: { type: String, ref: 'entity_3' },
		cat: String,
		job: String,
		as: String, 
	}], 
	directedTo: [{
		p: { type: String, ref: 'person_3' },
		n: Number, 
	}], 
	directedBy: [{
		p: { type: String, ref: 'person_3' },
		n: Number, 
	}], 
	actedWith: [{
		p: { type: String, ref: 'person_3' },
		n: Number, 
	}], 
}, { 
	collection: 'person',
	timestamps: false,
})


export default mongoose.model("person_3", Person);