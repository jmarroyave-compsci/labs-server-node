import mongoose from 'mongoose';

const Info = new mongoose.Schema({
	db: {
		version : String
	},
	created: { type: Number, default: Date.now()},
}, {
	collection: '_',
	timestamps: false,
})

export default mongoose.model("Info", Info);