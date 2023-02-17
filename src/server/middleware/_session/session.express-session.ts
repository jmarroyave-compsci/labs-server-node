import CONFIG from 'common/config'
import session from "express-session"
import { getParameters } from './session.config'

export const init = ( app ) => {
  const params = getParameters(CONFIG, CONFIG.LOCAL)
  //console.log("SESSION", params)
  app.use( session( params ) )
}

