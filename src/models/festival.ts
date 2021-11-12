import mongoose from 'mongoose';

const Festival = new mongoose.Schema({
	_id: String,
	name: { type: String, required: true},
	wiki_topic: String,
	country: String,
	continent: String,
	established: Number,
}, { 
	collection: 'festival',
	timestamps: false,
})


export default mongoose.model("festival", Festival);