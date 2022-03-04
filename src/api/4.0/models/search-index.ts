import mongoose from 'mongoose';

const SearchIndex = new mongoose.Schema({
	tt: String,
	ty: String,
	dc: {},
	yr: Number,
}, { 
	collection: 'search_index',
	timestamps: false,
})

export default mongoose.model("search_index", SearchIndex);