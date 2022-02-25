import { Request, Response } from "express";
import * as Service from 'v4/services/SearchService';
import * as HistoryService from 'api/global/services/HistoryService';
import * as utils from 'lib/misc';
import { default as P } from "bluebird";

export async function searchResultsGet(req: Request, res: Response): P<any> {
  HistoryService.addSearched(req, req.query.qry)
  const data = await Service.searchResults( req.query );
  utils.writeJSON(res, data);
};


export async function searchSuggestionsGet(req: Request, res: Response): P<any> {
  const data = await Service.searchSuggestions( { qry: req.query.qry } );
  utils.writeJSON(res, data);
};
