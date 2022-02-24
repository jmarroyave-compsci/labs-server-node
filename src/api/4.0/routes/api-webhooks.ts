import express from "express";
import * as controller from "v4/controllers/WebHook";

const {dialogflow} = require('actions-on-google');
const app = dialogflow({debug:true});

app.intent('Default Welcome Intent', (conv)=>{
    controller.helloWorld(conv)
});

const router = express.Router();
router.use("/4.0/webhook", app);

export default router;