import * as fs from 'fs'
import log from 'common/log';
import { getResourcePath } from 'common/files'


export const init =  ( app ) => {
    app.use(notFoundRoute)
}

function notFoundRoute(req, res, next) {  
  res.type('text/html');
  return res.status(404).send( fs.readFileSync( getResourcePath("errors/404.html") ).toString() )

}
