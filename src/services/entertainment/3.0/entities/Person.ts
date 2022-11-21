import * as Service from '../repositories/PeopleService';

export async function personGet( query, params, session ){
  return await Service.personGet( { id: params.id  } );
};

export async function peopleGet( query, params, session ){
  return await Service.peopleGet( query );
};