import * as ListsService from 'v4/services/ListsService';
import * as SearchService from 'v4/services/SearchService';

//import { Collection } from '@assistant/conversation';
import { Image, Table, Carousel, BasicCard, Button, Suggestions, } from 'actions-on-google'

const IMG_SERIES_PLACEHOLDER = "https://entertainment-series.herokuapp.com/img/ph-poster.jpg";

export async function fallback(conv) {
  conv.ask("sorry, I didn't get it");  
};

export async function hello(conv) {
  conv.ask('Hello!!');  
};

export async function help(conv) {
  conv.ask("you could try any genre or series name");
  conv.ask(new Suggestions(["popular"]));
};

const CTX_NAME = 'list-ctx'

export async function getMoreItems(conv) {
  var ctx = conv.contexts.get(CTX_NAME);
  if(!ctx){
    conv.ask("sorry, what was you talking about?")
    this.help(conv)
    return
  }

  conv.contexts.set(CTX_NAME, 5, { ...ctx, page: ctx.page + 1});
  const params = ctx.params;
  if(ctx.list == "popular"){
    return getPopularList(conv, params)
  } else if(ctx.list.startsWith("genre")){
    return getGenreList(conv, params)
  }  
};

export async function getGenreList(conv, params) {
  const genre = params['series_genre']
  return getList(conv, params, `genre_${genre}`, { listName : `the genre ${genre}` })
};

export async function getPopularList(conv, params) {
  return getList(conv, params, "popular", { listName : "most popular" })
};

export async function getList(conv, params, listId, captions) {
  const pageSize = 5;
  var ctx = conv.contexts.get(CTX_NAME);

  if(ctx?.list != listId) ctx = {}

  const page = ctx?.page ?? 1
  const data = await ListsService.getListItems( listId, 1, 25 );

  if(data?.items?.length == 0){
    conv.ask(`sorry, i don't have any information for ${captions.listName} series right now`);  
    conv.contexts.delete(CTX_NAME);
  } else {
    conv.ask(`here are the ${captions.listName} series`);  
    answerListCarousel(conv, listId, data.items.slice((page -1) * pageSize, page * pageSize ))
    if( data?.items?.length > ( page * pageSize) ){
      conv.ask(new Suggestions(["more"]));
    }
    conv.contexts.set(CTX_NAME, 5, {list: listId, page: page, params: params});
  }  
};


function answerListCarousel( conv, title, data ){
  if(data.length == 0) return
 
  const items = {}
  data.forEach( (o, idx) => {
    const r = o.toObject()
    const id = r._id;
    const title = r.info.title;
    const description = r.info?.keywords.join(" - ");
    const img = r?.media?.images?.poster;
    items[id] = {
      title: title,
      synonyms: [r._id],
      description: null,
      image: new Image({
        url: img ? img : IMG_SERIES_PLACEHOLDER,
        alt: title,
      })
    }
  })

  conv.ask(new Carousel({
    items: items
  }));
}

export async function getCard(conv) {
  conv.ask("testing cards");
  conv.ask(new BasicCard({
    title: "test",
    image: new Image({
      alt: "img",
      url: IMG_SERIES_PLACEHOLDER,
    }),
    buttons: new Button({
      title: "test",
      url: "https://google.com",
    }),
  }));
  conv.ask("ready");
};

export async function getCarousel(conv) {
  conv.ask('Which of these looks good?');  
  conv.ask(new Carousel({
    items: {
      car: {
        title: 'Car',
        description: 'A four wheel vehicle',
        synonyms: ['automobile', 'vehicle'],
      },
      plane: {
        title: 'Plane',
        description: 'A flying machine',
        synonyms: ['aeroplane', 'jet'],
      },
    }
  }));
};

export async function getImage(conv) {
  conv.ask('Hi, how is it going?');
  conv.ask(`Here's a picture of a cat`);
  conv.ask(new Image({
    url: IMG_SERIES_PLACEHOLDER,
    alt: 'A cat',
  }));

};
