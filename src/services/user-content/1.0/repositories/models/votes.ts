import db from './db'

export default db.model( "votes", {
	owner: {
		page: String,
		instance: String,
	},
	neutralVotes: [{
		user: String,	
		created: Date,
	}],
	upVotes: [{
		user: String,	
		created: Date,
	}],
	downVotes: [{
		user: String,	
		created: Date,
	}],
	created: Date,
}, { 
	collection: 'votes',
	timestamps: false,
})
