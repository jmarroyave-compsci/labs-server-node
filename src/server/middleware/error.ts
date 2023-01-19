import * as fs from 'fs'
import log from 'common/log';
import { getResourcePath } from 'common/files'


export const init = ( app ) => {
    app.use(middleware)
}

const middleware = function (err, req, res, next) {
    console.log("-----##$!@#%@^%#&#$------", err)
    log.error(`${err}`)
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error', { res : res });

    res.type('text/html');
    return res.status(500).send( fs.readFileSync( getResourcePath("errors/500.html") ).toString() )
}
