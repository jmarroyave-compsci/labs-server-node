import db from './db'

export default db.model( "comment", {
	text: String,
	from: String,
	who: String,
	when: Date,
}, { 
	collection: '__comment',
	timestamps: false,
})