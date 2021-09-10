import mongoose from "mongoose";

const Person = new mongoose.Schema({
	name: String,
	directed: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' } ],
	acted: [ { type: mongoose.Schema.Types.ObjectId, ref: 'movie' },
}, { collection: 'person' })

export default mongoose.model("person", Person);