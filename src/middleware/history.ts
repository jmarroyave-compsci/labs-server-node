import log from "config/log";

const middleware = function (req, res, next) {
    //log.info(`session_id: ${req.session.id}`)
    //log.info(`cookie: ${JSON.stringify(req.session, null , 2)}`)
    next();
}

export default middleware