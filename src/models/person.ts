const mongoose = require("mongoose")

const Person = mongoose.Schema({
	id: String,
	name: String,
	birthDate: Date,
	deathDate: Date,
	profession: [ String ],
	directed: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ],
	acted: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ],

	created: { type: Number, default: Date.now()},
}, {
	collection: 'person',
	timestamps: false,
})

Person.index({ id: 1, name: 1 }, { unique: true })


export default mongoose.model("person", Person);
