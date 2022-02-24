import express from "express";
import * as controller from "v4/controllers/WebHook";

import {conversation, Card, Image } from '@assistant/conversation';
const app = conversation({debug:true});

app.handle('Default Welcome Intent', (conv)=>{
    return controller.hello(conv)
});

app.handle('Default Fallback Intent', (conv)=>{
    return controller.fallback(conv)
});

app.handle('hello', conv => {
    conv.add('This is a card rich response.');
    conv.add(new Card({
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      text: 'Card Content',
      image: new Image({
        url: 'https://developers.google.com/assistant/assistant_96.png',
        alt: 'Google Assistant logo'
      })
    }));
  });

app.handle('get-genre-series', conv =>{
    return controller.getGenreList(conv, null)
});

app.handle('get-popular', (conv)=>{
    return controller.getPopularList(conv)
});

app.handle('get_popular', (conv)=>{
    return controller.getPopularList(conv)
});

const router = express.Router();
router.use("/4.0/webhook", app);

export default router;