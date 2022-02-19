import log from "config/log";

const middleware = function (req, res, next) {
    log.info(`session_id: ${req.session.id}`)
    next();
}

export default middleware