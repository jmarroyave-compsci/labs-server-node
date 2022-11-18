import db from './db'

export default db.model( "history", {
	_id: String,
	tv_shows : [ { type: String, ref: "entity"} ],
	searched : [ String ],
	created: Date,
	online: Boolean,
}, { 
	collection: '__user_history',
	timestamps: false,
})
