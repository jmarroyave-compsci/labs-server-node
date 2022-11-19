import HistoryModel from './models/history'
import config from 'common/config'

const getHistory = async function( sessionId ) {
  const user = sessionId;
  const resp = new HistoryModel();  
  resp['_id'] = user;
  resp['created'] = new Date()

  if(config.CACHE_SERVER) return resp

  const history = await HistoryModel.findOne( { _id : user } );

  if( !history ){
    return resp
  }
  
  return history  
}

export const addTVShow = async function( sessionId, entity ) {
  if(config.CACHE_SERVER) return null

  const history = await getHistory( sessionId )

  if( history['tv_shows'].includes(entity) ){
    history['tv_shows'] = history['tv_shows'].filter( r => r != entity )  
  }
  history['tv_shows'].push( entity )

  await history.save()
};

export const addSearched = async function( sessionId, qry ) {
  if(config.CACHE_SERVER) return null

  const history = await getHistory(sessionId)

  if( history['searched'].includes(qry) ){
    history['searched'] = history['searched'].filter( r => r != qry )  
  }
  history['searched'].push( qry )
  await history.save()
};

export const getListItems = async function( list, page, limit, sessionId ) {
  const resp = { name: list, ref: "recently viewed", items: []}
  if(config.CACHE_SERVER) return resp

  const user = sessionId;
  const history = await HistoryModel.findOne( { _id : user }, { "tv_shows" : { $slice : -10 }} )
                                    .populate("tv_shows")
  resp.items = history?.['tv_shows'].reverse() ?? []
  return resp
};