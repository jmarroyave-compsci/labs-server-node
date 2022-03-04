import express from "express";
import * as controller from "v4/controllers/WebHook";

import { dialogflow } from 'actions-on-google'
const app = dialogflow({debug:true});

//import { conversation } from '@assistant/conversation';
//const app = conversation({debug:true});

app.intent('Default Fallback Intent', (conv)=>{
    return controller.fallback(conv)
});

app.fallback((conv) => {
    return controller.fallback(conv)
});

app.intent('Default Welcome Intent', (conv)=>{
    return controller.hello(conv)
});

app.intent('hello', conv => {
    return controller.hello(conv)
});

app.intent('test-1', conv => {
    return controller.getCarousel(conv)
});

app.intent('test-2', conv => {
    return controller.getCard(conv)
});

app.intent('test-3', conv => {
    return controller.getImage(conv)
});

app.intent('help', conv => {
    return controller.help(conv)
});

app.intent('get-genres', (conv, params)=>{
    return controller.getGenres(conv)
});

app.intent('get-genre-series', (conv, params) =>{
    return controller.getGenreList(conv, params)
});

app.intent('get-genre-series-more', (conv, params) =>{
    return controller.getMoreItems(conv)
});

app.intent('get-popular', (conv, params)=>{
    return controller.getPopularList(conv, params)
});

app.intent('get-popular-more', (conv, params)=>{
    return controller.getMoreItems(conv)
});

const router = express.Router();
router.use("/4.0/webhook", app);

export default router;