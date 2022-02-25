import mongoose from 'mongoose';

const SearchIndex = new mongoose.Schema({
	ty: String,
	dc: {},
	yr: Number,
}, { 
	collection: 'search_index',
	timestamps: false,
})

export default mongoose.model("search_index", SearchIndex);