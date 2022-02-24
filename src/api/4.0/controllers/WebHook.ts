import * as ListsService from 'v4/services/ListsService';
import { Collection } from '@assistant/conversation';

export async function fallback(conv) {
  conv.add("sorry, I didn't get it");  
};

export async function hello(conv) {
  conv.add('Hello!!');  
};

export async function getGenreList(conv, {series_genre}) {
  const data = await getList(`genre-${series_genre}`)
  answerListCarousel(conv, series_genre, data)
};

export async function getPopularList(conv) {
  const data = await getList('popular')
  answerListCarousel(conv, "popular", data)
};

async function getList(listName){
  const list = listName
  const limit = 5
  const page = 1
  const data = await ListsService.getListItems( list, page, limit );
  //console.log(JSON.str*ingify(data, null, 2))
  return data
}

function answerListCarousel( conv, title, data ){
  if(data.items.length > 0){
 
    conv.session.typeOverrides = [{
      name: 'tv_serie',
      mode: 'TYPE_MERGE',
      synonym: {
        entries: data.items.map( (o, idx) => {
          const r = o.toObject()
          const id = r._id;
          const title = r.title;
          const img = r?.media?.images?.poster;
          return{
            name: id,
            synonyms: [],
            display: {
               title: title,
               image: img,
              }  
          }
        })
      }
    }]
 
    const list = {
      title: "list",
      subtitle: title,
      items: data.items.map( o => {
        const r = o.toObject()
        const id = r._id;
        return { 
          key: id,
        }
      })
    }
    conv.add('Which of these looks good?');
    conv.add(new Collection(list));
  } else {
    conv.add("sorry, i don't have info for this");  
  }
}