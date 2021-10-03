const mongoose = require("mongoose")

const DashboardPodcast = mongoose.Schema({
	total: Number,
	language: {
		type : Map,
		of: Number
	},
	country: {
		type : Map,
		of: Number
	},	
	category: {
		type : Map,
		of: Number
	},
	yearCreated: {
		type : Map,
		of: Number
	},
})


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
	rating: {
		type : Map,
		of: Number,
	},
	classification: {
		type : Map,
		of: Number,
	},
	awards: {
		type : Map,
		of: Number,
	},
	created: { type: Number, default: Date.now()},
})


const Dashboard = mongoose.Schema({
	lastUpdate: Date,
	people: DashboardPeople,
	movies: DashboardMovies,
	podcasts: DashboardPodcast,
	created: { type: Number, default: Date.now()},
}, {
	collection: 'dashboard',
	timestamps: false,
})

export default mongoose.model("dashboard", Dashboard);
