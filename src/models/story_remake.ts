import mongoose from 'mongoose';

const StoryRemake = new mongoose.Schema({
	name: String,
	count: Number,
	recs: [ { type: String, ref: 'entity' } ], 
}, { 
	collection: 'compute_movies_remakes',
	timestamps: false,
})


export default mongoose.model("StoryRemake", StoryRemake);