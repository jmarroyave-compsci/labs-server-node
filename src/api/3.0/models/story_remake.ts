import mongoose from 'mongoose';

const StoryRemake = new mongoose.Schema({
	name: String,
	count: Number,
	recs: [ { type: String, ref: 'entity_3' } ], 
}, { 
	collection: 'movie_remakes',
	timestamps: false,
})


export default mongoose.model("story_remake_3", StoryRemake);