import mongoose from 'mongoose';

const Festival = new mongoose.Schema({
	id: String,
	name: { type: String, required: true},
	wiki_topic: String,
	country: String,
	continent: String,
	established: Number,

	created: { type: Number, default: Date.now()},
}, { 
	collection: 'festival',
	timestamps: false,
})


export default mongoose.model("Festival", Festival);