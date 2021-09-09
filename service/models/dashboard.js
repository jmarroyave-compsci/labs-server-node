const mongoose = require("mongoose")

const Dashboard = mongoose.Schema({
	last_update: Date,
	people: Number,
	actors: Number,
	directors: Number,
	movies: Number,
	countries: {
		type : Map,
		of: Number
	},
	genres: {
		type : Map,
		of: Number
	},
	types: {
		type : Map,
		of: Number
	},
	years_released: {
		type : Map,
		of: Number
	},
	years_added: {
		type : Map,
		of: Number
	},
}, { collection: 'dashboard' })

module.exports = mongoose.model("dashboard", Dashboard);