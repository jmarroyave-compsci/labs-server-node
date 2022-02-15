import DBEntity from 'v4/models/entity';
import DBList from 'v4/models/list';

export const getListItems = async function( list, page, limit ) {
  const paging = {page: 1, limit: 10}
  paging.page = (page) ? page : 1;
  paging.limit = (limit) ? limit : 10;

  const where = {
      name : list,
      enabled: true,
  }

  console.log(where)

  const results = await DBList.findOne( where )
      .skip( paging.limit * ( paging.page - 1 ) )
      .limit( paging.limit)
      .populate("items._id")

  const resp = results?.['items'].map( r => r._id ).filter( r => r != null) ?? []

  console.log(list, results["_id"] , resp.length ?? 0)

  return resp
};
