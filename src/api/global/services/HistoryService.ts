import HistoryModel from '../models/history'


const getHistory = async function( req ){
  const user = req.session.id;
  var history = await HistoryModel.findOne( { _id : user } );

  if( !history ){
    history = new HistoryModel();  
    history['_id'] = user;
    history['created'] = new Date()
  }
  
  return history  
}

export const addTVShow = async function( req, entity ) {
  const history = await getHistory(req)

  if( history['tv_shows'].includes(entity) ){
    history['tv_shows'] = history['tv_shows'].filter( r => r != entity )  
  }
  history['tv_shows'].push( entity )

  await history.save()
};

export const addSearched = async function( req, qry ) {
  const history = await getHistory(req)

  if( history['searched'].includes(qry) ){
    history['searched'] = history['searched'].filter( r => r != qry )  
  }
  history['searched'].push( qry )
  await history.save()
};

export const getListItems = async function( list, page, limit, req ) {
  const user = req.session.id;
  const history = await HistoryModel.findOne( { _id : user }, { "tv_shows" : { $slice : -10 }} )
                                    .populate("tv_shows")

  return { name: list, ref: "recently viewed", items: history?.['tv_shows'].reverse() ?? []}
};