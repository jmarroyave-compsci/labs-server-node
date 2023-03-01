import db from './db'

export default db.model( "comment", {
	owner: {
		page: String,
		instance: String,
	},
	user: {
		id: String,
		name: String,
		avatar: String,
	},	
	text: String,
	replies : [ String ],
	parent: String,
	created: Date,
}, { 
	collection: 'comment',
	timestamps: false,
})
