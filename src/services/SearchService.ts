import DBSearch from '../models/search';
import fs from 'fs';


export const searchResults = async function( params ) {
const mdResults = JSON.parse(fs.readFileSync(__dirname + '/../files/mockup-data/search/results.json').toString());
  return mdResults;
  /*
  var data =  await DBSearch.find( { $text: { $search : params.qry } }, { score : { $meta: "textScore" } } )
                            .sort({ score : { $meta : 'textScore' } })
                            .limit(10);
  return data;
  */

};

export const searchSuggestions = async function( params ) {
const mdSuggestions = JSON.parse(fs.readFileSync(__dirname + '/../files/mockup-data/search/suggestions.json').toString());
  return { suggestions: mdSuggestions};

  const data =  await DBSearch.find( { $text: { $search : params.qry } }, { score : { $meta: "textScore" } } )
                            .sort({ score : { $meta : 'textScore' } })
                            .limit(10);
  console.log(data);
  return data.map( d => d.text );
};
