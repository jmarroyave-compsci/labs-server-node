import log from 'common/log';
import { init as initRenderProvider } from "./provider-render"


export const init = ( app ) => {
    console.log("CONFIGURING MIDDLEWARE", "HOSTING PROVIDER")

    initRenderProvider(app)
}

const middleware = function (req, res, next) {
    next();
}
