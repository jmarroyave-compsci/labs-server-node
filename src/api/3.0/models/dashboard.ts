import mongoose from 'mongoose';

const DashboardPodcast = new mongoose.Schema({
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


const DashboardPeople = new mongoose.Schema({
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
	decadeBirth: {
		type : Map,
		of: Number
	},
})

const DashboardMovies = new mongoose.Schema({
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

const DashboardTV = new mongoose.Schema({
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

const DashboardGames = new mongoose.Schema({
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
	rating: {
		type : Map,
		of: Number,
	},
	created: { type: Number, default: Date.now()},	
})

const DashboardFestival = new mongoose.Schema({
	total: Number,
	startYear: {
		type : Map,
		of: Number
	},
	startDecade: {
		type : Map,
		of: Number
	},
	country: {
		type : Map,
		of: Number
	},
	continent: {
		type : Map,
		of: Number
	},
})


const Dashboard = new mongoose.Schema({
	lastUpdate: Date,
	people: DashboardPeople, 	
	movies: DashboardMovies, 	
	podcasts: DashboardPodcast, 	
	tvShows: DashboardTV, 	
	videoGames: DashboardGames, 	
	festivals: DashboardFestival, 	
	created: { type: Number, default: Date.now()},	
}, { 
	collection: 'dashboard',
	timestamps: false,
})

export default mongoose.model("dashboard_3", Dashboard);