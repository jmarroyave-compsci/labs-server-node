import * as ListsService from 'v4/services/ListsService';
//import { Collection } from '@assistant/conversation';
import { Image, Table, Carousel, BasicCard, Button } from 'actions-on-google'

const IMG_URL_GOOGLE_HOME = "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw";

export async function fallback(conv) {
  conv.ask("sorry, I didn't get it");  
};

export async function hello(conv) {
  conv.ask('Hello!!');  
};

export async function getGenreList(conv, params) {
  const genre = params['series_genre']
  const data = await getList(`genre_${genre}`)
  conv.ask(`here are the series for the genre ${genre}`);
  if(data?.items?.length == 0){
    conv.ask(`sorry, i don't have info for the genre ${genre} right now`);  
  } else {
    conv.ask(`here are the ${genre} series`);  
    answerListCarousel(conv, params['series_genre'], data)  
  }  
};

export async function getPopularList(conv) {
  const data = await getList('popular')
  conv.ask(`here are the most popular series`);
  if(data?.items?.length == 0){
    conv.ask("sorry, i don't have info for popular series right now");  
  } else {
    conv.ask(`here are the most popular series`);  
    answerListCarousel(conv, "popular", data)
  }  
};

async function getList(listName){
  const list = listName
  const limit = 5
  const page = 1
  const data = await ListsService.getListItems( list, page, limit );
  return data
}

function answerListCarousel( conv, title, data ){
  if(data.items.length == 0) return
 
  const items = {}
  data.items.forEach( (o, idx) => {
    const r = o.toObject()
    const id = r._id;
    const title = r.title;
    const img = r?.media?.images?.poster;
    items[id] = {
      title: title,
      synonyms: [],
      description: "",
      image: new Image({
        url: img ? img : IMG_URL_GOOGLE_HOME,
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
      url: IMG_URL_GOOGLE_HOME,
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
    url: IMG_URL_GOOGLE_HOME,
    alt: 'A cat',
  }));

};
