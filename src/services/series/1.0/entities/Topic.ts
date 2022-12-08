import * as Service from '../repositories/TopicsService';

export async function get( query, params ) {
  return await Service.get( query );
};

export async function getTopic( query, params ) {
  return await Service.getTopic( {topic: params.topic} );
};
