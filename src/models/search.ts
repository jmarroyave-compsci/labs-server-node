const mongoose = require("mongoose")

const SearchIndex = mongoose.Schema({
	entityId: String,
	entity: String,
	type: String,
}, {
	collection: 'search_index',
	timestamps: false,
})

SearchIndex.index({ entity: 1 }, { collation: { locale: 'en', strength: 2 } } )

export default mongoose.model("SearchIndex", SearchIndex);
