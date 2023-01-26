import { invoke } from 'common/service'
import { getSession } from 'common/session'

export const init = ( app ) => {
    app.use(middleware)
}

const middleware = function (req, res, next) {
    invoke({
        service: 'admin',
        version: '1.0',
        entity: 'log',
        operation: 'insert',
        params: {},
        session: getSession(req),
    })

    next();
}