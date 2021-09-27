import DBPerson from '../models/person';

export const personGet = async function( params ) {
  let results = [];

  results = await DBPerson.find( { id: params.id } ).select(` -_id`);
  return (results.length > 0) ? results[0] : null
};
