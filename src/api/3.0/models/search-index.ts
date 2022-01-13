import mongoose from 'mongoose';

const SearchIndex = new mongoose.Schema({
	entityId: String,
	entity: String,
	type: String,
	desc: String,
	ranking: Number,
	year: Number,
}, { 
	collection: 'search_index',
	timestamps: false,
})

export default mongoose.model("search_index", SearchIndex);