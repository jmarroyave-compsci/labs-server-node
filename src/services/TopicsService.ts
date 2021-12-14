import DBTopic from '../models/topic';
import { shuffle } from '../lib/array';

export const get = async function( params ) {
  const year = ( params.year ) ? parseInt(params.year) : null;
  const genre = ( params.genre ) ? params.genre : null;
  const page = ( params.page ) ? parseInt(params.page) : 1;
  const pageSize = 10;

  //const query = { decade : true }
  const query = {  }

  if( year ) query['year'] = year
  if( genre && genre != "all" ) query['genre'] = genre

  const data =  await DBTopic.find( query )
      .skip( pageSize * (page - 1) )
      .limit(pageSize);

  return data.map( d => {
    const words = d['words'].slice(0,200);
    return {
      year: d['year'],
      genre: d['genre'],
      words: words,
      max: words[0]['n'],
      min: words[words.length - 1]['n'],
    }
  })
}

export const getTopic = async function( params ) {
  const topic = ( params.topic ) ? params.topic : null;
  if(!topic) return []

  const query = { $text: { $search : topic } }

  const data =  await DBTopic.find( query, { year: 1, genre: 1, _id: 0 } )
      .limit(1000)
      .sort({ genre: 1, year: 1, });

  console.log(data.length)

  return data;
}