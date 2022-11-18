import * as Service from '../services/SearchService';
import * as HistoryController from 'api/global/1.0/controllers/History';

export async function searchResultsGet( query, parames, session ){
  const params = { qry: "", entities: [], page: null }
  params.qry = decodeURIComponent(query?.qry.toString())
  params['entities'] = JSON.parse(decodeURIComponent(query?.entities?.toString()))
  params.page = (query?.page) ? query?.page : 1;
  await HistoryController.addSearched(query, params, session)
   
  return await Service.searchResults( params );
};


export async function searchSuggestionsGet( query, params, session ){
  return await Service.searchSuggestions( { qry: query.qry } );
};
