import DBEntity from 'v4/models/entity';
import DBList from 'v4/models/list';
import { shuffle2 } from 'lib/array'

export const getListItems = async function( list, page, limit, shuffle=true ) {
  const paging = { 
    page: page ?? 1, 
    limit: limit ?? 25
  }

  if(shuffle){
    paging.page = 1
    paging.limit = 25
  }

  const where = {
      _id : list,
      enabled: true,
  }

  console.log(where, paging, "shuffle", shuffle)
  const result = await DBList.findOne( where ).populate("items._id")

  var resp; 
  resp = result?.['items'] ?? []
  resp = ( shuffle ) ? shuffle2(resp) : resp
  resp = resp.slice( (paging.page - 1) * paging.limit, (paging.page) * paging.limit )
              .map( r => r._id )
              .filter( r => r != null)

  const ref = result?.['ref'] ?? "?";

  console.log(`LIST: '${list}' ID: '${result?.["_id"] ?? "not found"}' ITEMS: ${resp.length ?? 0}`)

  return { name: list, ref : ref, items: resp}
};
