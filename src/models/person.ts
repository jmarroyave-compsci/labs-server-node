import mongoose from 'mongoose';

const Person = new mongoose.Schema({
	id: String,
	name: { type: String, required: true},
	birthDate: Date,
	deathDate: Date,
	profession: [ String ],
	awards: [ {  
		festival: { type: mongoose.Schema.Types.ObjectId, ref: 'Festival' }, 
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


Person.virtual('references').get(function() {
  return {
  	imdb: `https://www.imdb.com/title/${this.id}/`
  }
});

Person.index({ id: 1, name: 1 }, { unique: true })
Person.index({ name: 1 }, { unique: false })
Person.index({'awards.0': 1}, {partialFilterExpression: {'awards.0': {$exists: true}}});

export default mongoose.model("person", Person);