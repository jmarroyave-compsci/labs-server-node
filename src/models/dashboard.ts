const mongoose = require("mongoose")

const DashboardPeople = mongoose.Schema({
	total: Number,
	alive: Number,
	profession: {
		type : Map,
		of: Number
	},
	yearBirth: {
		type : Map,
		of: Number
	},
})

const DashboardMovies = mongoose.Schema({
	total: Number,
	country: {
		type : Map,
		of: Number
	},
	genre: {
		type : Map,
		of: Number
	},
	type: {
		type : Map,
		of: Number
	},
	yearReleased: {
		type : Map,
		of: Number
	},
	streamBy: {
		type : Map,
		of: Number,
	},

	created: { type: Number, default: Date.now()},
})


const Dashboard = mongoose.Schema({
	lastUpdate: Date,
	people: DashboardPeople,
	movies: DashboardMovies,
	created: { type: Number, default: Date.now()},
}, {
	collection: 'dashboard',
	timestamps: false,
})

export default mongoose.model("dashboard", Dashboard);
