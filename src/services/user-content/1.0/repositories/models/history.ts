import db from './db'

export default db.model( "history", {
	type: String,
	inst: String,
	user: String,	
	created: Date,
}, { 
	collection: 'history',
	timestamps: false,
})
