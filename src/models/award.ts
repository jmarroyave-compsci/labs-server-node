import mongoose from 'mongoose';
import DBFestival from './festival.js'

const Award = new mongoose.Schema({
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


export default mongoose.model("award", Award);