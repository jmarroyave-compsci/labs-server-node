import db from './db'

export default db.model( "user", {
	name: String,
	email: String,
	picture: String,
	locale: String,
	provider: {
		google: { type: String, unique: true },
	}
}, { 
	collection: 'user',
	timestamps: false,
})
