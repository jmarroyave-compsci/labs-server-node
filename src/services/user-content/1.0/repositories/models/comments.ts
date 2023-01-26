import db from './db'

export default db.model( "comments", {
	owner: String,
	text: String,
	user: {
		id: String,
		name: String,
		avatar: String,
	},	
	created: Date,
}, { 
	collection: 'comments',
	timestamps: false,
})
