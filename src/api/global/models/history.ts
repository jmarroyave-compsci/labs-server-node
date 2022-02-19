import mongoose from 'mongoose';

const History = new mongoose.Schema({
	_id: String,
	tvShows : [ String ],
}, { 
	collection: 'user_history',
	timestamps: false,
})


export default mongoose.model("History", History);