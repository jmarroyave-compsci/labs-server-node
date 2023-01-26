import * as Service from '../repositories/SearchService';
import { invoke } from 'common/service'

export async function searchResultsGet( query, parames, session ){
  const params = { qry: "", entities: [], page: null }
  params.qry = decodeURIComponent(query?.qry.toString())
  params['entities'] = JSON.parse(decodeURIComponent(query?.entities?.toString()))
  params.page = (query?.page) ? query?.page : 1;
  
  invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'history',
    operation: 'insert',
    params: {
      inst: params.qry,
      type: "search",
    },
    session: session,
  })
  
   
  return await Service.searchResults( params );
};


export async function searchSuggestionsGet( query, params, session ){
  return await Service.searchSuggestions( { qry: query.qry } );
};
