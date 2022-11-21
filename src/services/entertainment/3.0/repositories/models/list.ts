import db from './db'

export default db.model( "list", {
	_id: String,
	name: String,
	description: String,
	ref: String,
	items: [ {
		_id: { type: String, ref: 'entity' },
	}],
	enabled: Boolean,
}, { 
	collection: 'list',
	timestamps: false,
})
