import mongoose from 'mongoose';

const List = new mongoose.Schema({
	_id: String,
	name: String,
	description: String,
	ref: String,
	items: [ {
		_id: { type: String, ref: 'entity' },
	}],
	enabled: Boolean,
}, { 
	collection: 'list',
	timestamps: false,
})

export default mongoose.model("list", List);