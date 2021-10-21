import mongoose from 'mongoose';
import DBFestival from './festival.js'

const Award = new mongoose.Schema({
	festival: { type: mongoose.Schema.Types.ObjectId, ref: 'Festival' }, 
	year: { type: Number, required: true},
	awarded : [{
		entity: String,
		category: String,
		won: Boolean,
		id: String,
		film: String,
	}],
	created: { type: Number, default: Date.now()},
}, { 
	collection: 'award',
	timestamps: false,
})


export default mongoose.model("Award", Award);