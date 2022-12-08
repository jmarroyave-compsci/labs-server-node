import db from './db'

export default db.model( "festival", {
	_id: String,
	name: { type: String, required: true},
	wiki_topic: String,
	country: String,
	continent: String,
	startYear: Number,
}, { 
	collection: 'festival',
	timestamps: false,
})