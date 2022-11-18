import db from './db'

export default db.model( "search", {
	tt: String,
	ty: String,
	dc: {},
	yr: Number,
}, { 
	collection: 'search_index',
	timestamps: false,
})
