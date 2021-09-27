import { Request, Response } from "express";
import * as Service from '../../services/SearchService';
import * as utils from '../../lib/misc';
import { default as P } from "bluebird";

export async function searchResultsGet(req: Request, res: Response): P<any> {
  const data = await Service.searchResults( { qry: req.query.qry } );
  utils.writeJSON(res, data);
};


export async function searchSuggestionsGet(req: Request, res: Response): P<any> {
  const data = await Service.searchSuggestions( { qry: req.query.qry } );
  utils.writeJSON(res, data);
};
