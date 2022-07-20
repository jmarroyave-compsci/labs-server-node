import mongoose from 'mongoose';

const Topic = new mongoose.Schema({
	year: Number,
	genre: String,
	decade: Boolean,
	words: [ {
		p: String,
		n: Number,
	}],
}, { 
	collection: 'topics',
	timestamps: false,
})

export default mongoose.model("topic_3", Topic);