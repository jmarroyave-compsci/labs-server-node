import db from './db'

export default db.model( "topic", {
	year: Number,
	genre: String,
	decade: Boolean,
	words: [ {
		p: String,
		n: Number,
	}],
}, { 
	collection: 'topics',
	timestamps: false,
})