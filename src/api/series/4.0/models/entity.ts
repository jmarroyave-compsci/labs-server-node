import db from './db'

export default db.model( "entity", {
	_id: String,
	info: {
	},
	media: {
		images: {
			poster: String,
		},
	},
	awards: [ { 
		festival:  { type: String, ref: 'festival' }, 
		year: Number,
		category: String,
		won: Boolean,
		film: String,
	} ], 
	people: {
		stars: [{ type: String, ref: 'person' }], 
		cast: [{ type: String, ref: 'person' }], 
		directed: [{ type: String, ref: 'person' }], 
		produced: [{ type: String, ref: 'person' }], 
		written: [{ type: String, ref: 'person' }], 
		crew: [{ type: String, ref: 'person' }], 
	},
	lists: 	[{
		ref: String,
		items: [{ type: String, ref: 'entity' }], 
	}], 
}, { 
	collection: 'entity',
	timestamps: false,
})