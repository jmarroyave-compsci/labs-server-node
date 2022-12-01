import db from './db'

export default db.model( "tags", {
	name: String,
}, { 
	collection: 'tags',
	timestamps: false,
})
