import { fileSearchReplace, getResourcePath } from 'common/files';
import config from 'common/config'


export const init =  ( app ) => {
    app.use(rootRoute)
}

function rootRoute(req, res, next) {  
    console.log("ROUTE", "catching /")
    const file = getResourcePath("docs/index.html");
    const index = fileSearchReplace(file, "__VERSION__", config.VERSION);
    res.send(index);
}
