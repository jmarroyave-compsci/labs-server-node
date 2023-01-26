import db from './db'

export default db.model( "log", {
	endpoint: String,
	user: String,
	agent: String,
	created: Date,
}, { 
	collection: 'log',
	timestamps: false,
})
