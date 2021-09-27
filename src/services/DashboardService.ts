import DBDashboard from '../models/dashboard';


export const dashboardGet = async function( params ) {
  return await DBDashboard.findOne().sort({ created: -1 }).select(`people movies podcasts last_update -_id __v`);
};

export const dashboardHomeGet = async function( params ) {
  return await dashboardGet( params )
};

export const dashboardMoviesGet = async function( params ) {
  var data = await dashboardGet( params )
  return data.movies;
};

export const dashboardPodcastsGet = async function( params ) {
  var data = await dashboardGet( params )
  return data.podcasts;
};

export const dashboardPeopleGet = async function( params ) {
  var data = await dashboardGet( params )
  return data.people;
};

export const dashboardGetToV1_0 = async function( params ) {
  const resp = { people: 0, actors: 0, directors: 0, movies: 0, countries: {}, types: {}, genres: {}, yearsReleased : {}, lastUpdate: null};

  const result = await this.dashboardGet( params ); 

  if( result == null)
    return resp;

  resp.people = result.people.total;
  resp.directors = result.people.profession?.get("director") ?? 0
  resp.actors = result.people.profession?.get('actor') ?? 0 + result.people.profession?.get('actress') ?? 0
  resp.movies = result.movies.total;
  resp.countries = result.movies.country;
  resp.genres = result.movies.genre;
  resp.types = result.movies.type;
  resp.yearsReleased = result.movies.yearReleased;
  resp.lastUpdate = result.lastUpdate;

  return resp
};
