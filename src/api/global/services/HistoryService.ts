import HistoryModel from '../models/history'
import config from 'config/config'

const getHistory = async function( req ){
  if(config.CACHE_SERVER) return []

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
  if(config.CACHE_SERVER) return null

  const history = await getHistory(req)

  if( history['tv_shows'].includes(entity) ){
    history['tv_shows'] = history['tv_shows'].filter( r => r != entity )  
  }
  history['tv_shows'].push( entity )

  await history.save()
};

export const addSearched = async function( req, qry ) {
  if(config.CACHE_SERVER) return null

  const history = await getHistory(req)

  if( history['searched'].includes(qry) ){
    history['searched'] = history['searched'].filter( r => r != qry )  
  }
  history['searched'].push( qry )
  await history.save()
};

export const getListItems = async function( list, page, limit, req ) {
  const resp = { name: list, ref: "recently viewed", items: []}
  if(config.CACHE_SERVER) return resp

  const user = req.session.id;
  const history = await HistoryModel.findOne( { _id : user }, { "tv_shows" : { $slice : -10 }} )
                                    .populate("tv_shows")
  resp.items = history?.['tv_shows'].reverse() ?? []
  return resp
};