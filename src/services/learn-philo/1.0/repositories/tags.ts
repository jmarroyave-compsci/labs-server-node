import DBTags from './models/tags';

export const get = async function( params ) {
  return await DBTags.find( {} )
};