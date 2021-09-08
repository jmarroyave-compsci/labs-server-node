'use strict'

const path = require('path');

module.exports.moviesGet = async function moviesGet(req, res, next) {
  const DBMovie = require(path.join(__dirname, '/../db/movie'));
  const DBPerson = require(path.join(__dirname, '/../db/person'));
  var movies = []
  
  try{
    var params = {}
    Object.keys(req).map( k =>  {
      params[k] = req[k].value
    })

    const { page = 1, limit = 10, fields = "title,description,country,type,genre,duration,rating,released_date,added_date,director,cast" } = params
    movies = await DBMovie.find().select(`${fields.split(",").join(" ")} -_id`).limit(limit).skip( limit * (page - 1) );
  } catch ( ex ){
    console.error(ex);
  }  

  res.send( movies );

};