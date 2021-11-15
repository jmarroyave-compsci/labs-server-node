import DBGame from '../models/game';

export const getGame = async function( params ) {
  let results = null;
  results = await DBGame
    .find( { _id: params.id } )
    .populate("produced.id")
    .populate("directed.id")
    .populate("written.id")
    .populate("cast.id")
    .populate("crew.id")
    .populate("awards.festival")

  return (results && results.length > 0) ? results[0] : null
};