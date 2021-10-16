import mongoose from 'mongoose';

const SearchIndex = new mongoose.Schema({
	entityId: String,
	entity: String,
	type: String,
	desc: String,
}, { 
	collection: 'search_index',
	timestamps: false,
})

SearchIndex.index({ entity: 1 }, { collation: { locale: 'en', strength: 2 } } )


export default mongoose.model("SearchIndex", SearchIndex);