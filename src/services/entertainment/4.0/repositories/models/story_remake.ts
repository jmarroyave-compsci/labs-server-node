import db from './db'

export default db.model( "story_remake", {
	name: String,
	count: Number,
	recs: [ { type: String, ref: 'entity' } ], 
}, { 
	collection: 'movie_remakes',
	timestamps: false,
})
