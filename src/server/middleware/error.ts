import * as fs from 'fs'
import log from 'common/log';
import { getResourcePath } from 'common/files'

const middleware = function (err, req, res, next) {
    log.error(`${err}`)
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error', { res : res });

    res.type('text/plain');
    res.status(500).send( fs.readFileSync( getResourcePath("errors/500.html") ).toString() )
}

export default middleware