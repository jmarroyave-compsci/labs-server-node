import mongoose from 'mongoose';

const Comment = new mongoose.Schema({
	text: String,
	from: String,
	who: String,
	when: Date,
}, { 
	collection: '__comment',
	timestamps: false,
})

export default mongoose.model("comment", Comment);