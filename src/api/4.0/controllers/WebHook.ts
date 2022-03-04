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
      }
    }
  }));
};

export async function getImage(conv) {
  conv.ask('Hi, how is it going?');
  conv.ask(`Here's a picture of a cat`);
  conv.ask(new Image({
    url: '/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    alt: 'A cat',
  }));

};

export async function getGenreList(conv, params) {
  const data = await getList(`genre-${params['series_genre']}`)
  answerListCarousel(conv, params['series_genre'], data)
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
  return data
}

function answerListCarousel( conv, title, data ){
  if(data.items.length > 0){
 
    const items = {}
    data.items.forEacth( (o, idx) => {
      const r = o.toObject()
      const id = r._id;
      const title = r.title;
      const img = r?.media?.images?.poster;
      items[id] = {
        title: title,
        synonyms: [],
        description: "",
        image: new Image({
          url: img,
          alt: title,
        })
      }
    })

    conv.ask('Which of these looks good?');
    conv.ask(new Carousel({
      items: items
    }));

  } else {
    conv.ask("sorry, i don't have info for this");  
  }
}