import db from './db'

export default db.model( "role", {
	name: String,
	created: Date,
}, { 
	collection: 'role',
	timestamps: false,
})
