import DBDashboard from '../models/dashboard';

export const dashboardGet = async function( params ) {
  const resp = { people: 0, actors: 0, directors: 0, movies: 0, countries: {}, types: {}, genres: {}, yearsReleased : {}, lastUpdate: null};
  const result = await DBDashboard.findOne().sort({ created: -1 }).select(`people movies last_update -_id __v`);

  if( result == null)
    return resp;

  resp.people = result.people.total;
  resp.directors = result.people.profession.get("director")
  resp.actors = result.people.profession.get('actor') + result.people.profession.get('actress')
  resp.movies = result.movies.total;
  resp.countries = result.movies.country;
  resp.genres = result.movies.genre;
  resp.types = result.movies.type;
  resp.yearsReleased = result.movies.yearsReleased;
  resp.lastUpdate = result.lastUpdate;

  return resp
};


