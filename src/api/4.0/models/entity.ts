import mongoose from 'mongoose';

const Entity = new mongoose.Schema({
	_id: String,
	info: {
		boxoffice: 	String,
		production_company: String,
		website: 	String,
		stream_by: [ { 
			name: String,
			added: Number,		
		} ], 
		title: { type: String, required: true},
		plot: String,
		type: String,
		genres: [ String ],
		duration: Number,
		classification: String,
		language: String,
		on_air: {
			start: Date,
			start_year: Number,
			end: Date,
			end_year: Number,
		},
		rating: Number, 
		ratings: [ { 
			entity: String,
			rating: String,
			votes: Number,		
		} ], 
		country_origin: [ String ],
	},
	remakes: [],
	media : {
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
		stars: 	[{
			_id: { type: String, ref: 'person' }, 
		}], 
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
		name: String,
		items: [{ type: String, ref: 'entity' }], 
	}], 
}, { 
	collection: 'entity',
	timestamps: false,
})

export default mongoose.model("entity", Entity);