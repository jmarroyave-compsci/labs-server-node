import db from './db'
import DBFestival from './festival.js'

export default db.model( "award", {
	festival: { type: String, ref: 'festival' }, 
	year: { type: String, required: true},
	awarded : [{
		entity: String,
		category: String,
		won: Boolean,
		id: String,
		film: String,
	}],
}, { 
	collection: 'award',
	timestamps: false,
})
