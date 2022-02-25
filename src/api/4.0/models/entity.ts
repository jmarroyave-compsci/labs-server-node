import mongoose from 'mongoose';

const Entity = new mongoose.Schema({
	_id: String,
	/*
	info: {
		title: String,
		plot: String,
		genres: [ String ],
		type: String,
		duration: Number,
		on_air: {
			start: Date,
			start_year: Number,
			end: Date,
			end_year: Number,
		},
		rating: Number, 
		ratings: [ { 
			source: String,
			rating: String,
			votes: Number,		
		} ], 
		country_origin: [ String ],
		stream_by: [ { 
			name: String,
			added: Number,		
		} ], 
		classification: String,
		language: String,
		boxoffice: String,
		production_company: String,
		website: String,
	},
*/
	info: {
	},
	remakes: [],
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
		directors: [{ type: String, ref: 'person' }], 
		stars: [{ type: String, ref: 'person' }], 
		directed: 	[{
			_id: { type: String, ref: 'person' }, 
		}], 
		produced: 	[{
			_id: { type: String, ref: 'person' }, 
		}], 
		written: 	[{
			_id: { type: String, ref: 'person' }, 
		}], 
		cast: 	[{
			_id: { type: String, ref: 'person' },
			as: String, 
		}], 
		crew: 	[{
			_id: { type: String, ref: 'person' },
			cat: String,
			job: String,
			as: String, 
		}], 
	},
	lists: 	[{
		ref: String,
		items: [{ type: String, ref: 'entity' }], 
	}], 
}, { 
	collection: 'entity',
	timestamps: false,
})

export default mongoose.model("entity", Entity);