import CONFIG from 'common/config'
import session from "express-session"
import { localParams, serverParams } from './session.config'

export const init = ( app ) => {

  const params = (CONFIG.LOCAL) ? localParams : serverParams
  //console.log(params)
  app.use( session( params ) )
}

