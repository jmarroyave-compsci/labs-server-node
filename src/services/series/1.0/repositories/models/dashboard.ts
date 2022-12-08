import db from './db'


const DashboardPodcast = db.schema( {
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


const DashboardPeople = db.schema({
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

const DashboardMovies = db.schema({
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

const DashboardTV = db.schema({
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

const DashboardGames = db.schema({
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

const DashboardFestival = db.schema({
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


export default db.model( "dashboard", {
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