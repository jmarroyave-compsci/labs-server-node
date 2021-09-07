const mongoose = require("mongoose")

const Person = mongoose.Schema({
	name: String,
	directed: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ], 
	acted: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ], 
}, { collection: 'person' })

module.exports = mongoose.model("person", Person);