import DBTV from '../models/tv';

export const getTV = async function( params ) {
  let results = null;
  results = await DBTV
    .find( { _id: params.id } )
      .populate("produced.id")
      .populate("directed.id")
      .populate("written.id")
      .populate("cast.id")
      .populate("crew.id")
      .populate("awards.festival")
  return (results) ? results : null
};

