import * as ListsService from 'v4/services/ListsService';
import * as SearchService from 'v4/services/SearchService';
import * as EntitiesService from 'v4/services/EntitiesService';
import * as fs from 'fs'

//import { Collection } from '@assistant/conversation';
import { Image, Table, Carousel, BasicCard, Button, Suggestions, } from 'actions-on-google'

const CTX_LIST = 'list-ctx'

const IMG_SERIES_PLACEHOLDER = "https://entertainment-series.herokuapp.com/img/ph-poster.jpg";

const LogOption = (option) => {
  console.log("-".repeat(60)) 
  console.log("OPTION", ">", option.toUpperCase()) 
  console.log("-".repeat(60)) 
}

export async function fallback(conv) {
  const qry = conv.query.toLowerCase()
  LogOption(`FALLBACK "${qry}"`)

  switch(qry){
    case "more":
      conv.ask("no more items");  
      return
  }

  var ctx = conv.contexts.get("actions_intent_option");
  console.log("LIST CTX: ACTIVE", ctx?.parameters?.OPTION)
  console.log("CTX: ACTIVE", conv.contexts.get(CTX_LIST).parameters)
  if(ctx){
    const id = ctx?.parameters?.OPTION
    if(await getSeries(conv, id)) return
  } 
  
  if(await findSeries(conv, qry)) return

  conv.ask("sorry, I didn't get it");  
};

async function findSeries(conv, qry){
  LogOption(`FIND SERIES, ${qry}`)
  conv.ask(`searching for: ${qry}`);  
  const resp = await SearchService.searchResults( {qry: qry, entities: ["tv_show"]} )
  if(resp.length == 0) return false;

  if(resp.length == 1) {
    getSeries(conv, resp[0]['dc']['id'])
    return true
  }

  answerListCarousel(conv, resp.map( r => {
    return {
      _id: r['dc']['id'],
      info: {
        title: r['dc']['title'],
      },
      media: {
        images: {
          poster: r['dc']['thumb'] ?? IMG_SERIES_PLACEHOLDER,
        },
      },
    }
  }))
  return true
}

async function getSeries(conv, id){
  LogOption(`GET SERIES: ${id}`)
  const ent = await EntitiesService.entityGetSimple({ id : id })
  if(ent){
    console.log("title", ent['info']['title'])
    conv.ask("here is the series")
    conv.ask(new BasicCard({
      title: ent['info']['title'],
      subtitle: ent['info']['keywords'],
      image: new Image({
        alt: "img",
        url: ent['media']['images']['poster'],
      }),
      buttons: new Button({
        title: "imdb",
        url: `https://imdb.com/title/${ent['_id']}`,
      }),
    }));
  }

  return true
}

export async function hello(conv) {
  conv.ask('Hello!!');  
};

export async function getGenres(conv) {
  const genres = fs.readFileSync("lib/enums")
  conv.ask('Here is the list of genres');
  conv.ask(new Suggestions([]));

};


export async function help(conv) {
  LogOption("HELP")
  conv.ask("you could try any genre or series name");
  conv.ask(new Suggestions(["popular"]));
};

export async function getMoreItems(conv) {
  LogOption("GET MORE ITEMS")
  const ctx = conv.contexts.get(CTX_LIST);
  const parameters = ctx?.parameters;
  console.log(parameters)

  if(!parameters){
    conv.ask("sorry, what was you talking about?")
    this.help(conv)
    return
  }

  if(parameters.list == "popular"){
    return getPopularList(conv, parameters.params)
  } else if(ctx.parameters.list.startsWith("genre")){
    return getGenreList(conv, parameters.params)
  }  
};

export async function getGenreList(conv, params) {
  LogOption("GET GENRE LIST")
  const genre = params['series_genre'].toLowerCase()
  return getList(conv, params, `genre_${genre.replace(/-/g,"_")}`, { listName : `${genre}` })
};

export async function getPopularList(conv, params) {
  LogOption("GET POPULAR LIST")
  return getList(conv, params, "popular", { listName : "popular" })
};

export async function getList(conv, params, listId, captions) {
  const pageSize = 5;
  var ctx = conv.contexts.get(CTX_LIST);

  if(ctx && ctx?.parameters?.list != listId) ctx = {}
  console.log(ctx?.parameters)

  const page = ctx?.parameters?.page ?? 0
  const data = await ListsService.getListItems( listId, 1, 25, false );

  if(data?.items?.length == 0){
    if(page == 0){
      conv.ask(`sorry, i don't have any information for ${captions.listName} series right now`);  
    } else {
      conv.ask(`sorry, i don't have any more information for ${captions.listName} series right now`);  
    }
  } else {
    if(page == 0){
      conv.ask(`here are the ${captions.listName} series`);  
    } else{
      conv.ask(`page ${page + 1}`);  
    }

    answerListCarousel(conv, data.items.slice(page * pageSize, (page + 1) * pageSize ))
    await conv.contexts.set(CTX_LIST, 5, {list: listId, page: page + 1, params: params});
  }  

  if( data?.items?.length > ( (page + 1) * pageSize) ){
    conv.ask(new Suggestions(["more"]));
  } else {
    conv.contexts.delete(CTX_LIST);
  } 
};

function answerListCarousel( conv, data ){
  if(data.length == 0) return
 
  const items = {}
  data.forEach( (o, idx) => {
    const r = (o.toObject) ? o.toObject() : o
    const id = r._id;
    const title = r.info.title;
    const description = r.info?.keywords?.join(" - ");
    const img = r?.media?.images?.poster;
    items[id] = {
      title: title,
      synonyms: [r._id],
      description: description,
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
