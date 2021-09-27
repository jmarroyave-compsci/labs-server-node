const mongoose = require("mongoose")

const Person = mongoose.Schema({
	id: String,
	name: String,
	birthDate: Date,
	deathDate: Date,
	profession: [ String ],
	awards: [ {  
		name: { type : String, index: true},
		year: Number,
		category: String,
		won: Boolean,		
	} ], 

	directed: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ], 
	acted: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ], 
	
	created: { type: Number, default: Date.now()},

	references : {
		imdb: { type: String, default: function(){
				return `https://www.imdb.com/name/${this.id}/`
			}
		},
	},
}, { 
	collection: 'person',
	timestamps: false,
})

Person.index({ id: 1, name: 1 }, { unique: true })
Person.index({ name: 1 }, { unique: false })

export default mongoose.model("person", Person);
