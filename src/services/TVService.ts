import DBTV from '../models/tv';

export const getTV = async function( params ) {
  let results = null;
  results = await DBTV.findOne( { id: params.id } ).select(` -_id`);
  return (results) ? results : null
};

