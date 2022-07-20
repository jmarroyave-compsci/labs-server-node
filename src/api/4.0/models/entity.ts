import mongoose from 'mongoose';

const Entity = new mongoose.Schema({
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
	episodes: {
	},
}, { 
	collection: 'entity',
	timestamps: false,
})

export default mongoose.model("entity", Entity);