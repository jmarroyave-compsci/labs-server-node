import HistoryModel from '../models/history'

export const addTVShow = async function( req, entity ) {
  const user = req.session.id;

  var history = await HistoryModel.findOne( { _id : user } );

  if( !history ){
    history = new HistoryModel();  
    history['_id'] = user;
  }

  history['tvShows'].push( entity ) 
  await history.save()
};