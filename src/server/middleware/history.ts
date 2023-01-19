import log from 'common/log';


export const init =  ( app ) => {
    app.use(middleware)
}


const middleware = function (req, res, next) {
    //log.info(`session_id: ${req.session.id}`)
    //log.info(`cookie: ${JSON.stringify(req.session, null , 2)}`)
    next();
}

