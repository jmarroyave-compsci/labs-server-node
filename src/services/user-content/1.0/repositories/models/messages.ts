import db from './db'

export default db.model( "message", {
	owner: {
		page: String,
		instance: String,
	},
	text: String,
	params: String,
	created: Date,
}, { 
	collection: 'message',
	timestamps: false,
})
