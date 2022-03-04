import DBEntity from 'v4/models/entity';
import DBList from 'v4/models/list';
import { shuffle2 } from 'lib/array'

export const getListItems = async function( list, page, limit ) {
  const paging = { page: page ?? 1, limit: limit ?? 25}

  const where = {
      _id : list,
      enabled: true,
  }

  console.log(where)

  const result = await DBList.findOne( where )
                             .populate("items._id")

  const resp = result?.['items'].slice(0,paging.limit).map( r => r._id ).filter( r => r != null) ?? []
  const ref = (result?.['ref']) ? result['ref'] : list;

  console.log(`LIST: '${list}' ID: '${result?.["_id"] ?? "not found"}' ITEMS: ${resp.length ?? 0}`)

  return { name: list, ref : ref, items: shuffle2(resp)}
};
