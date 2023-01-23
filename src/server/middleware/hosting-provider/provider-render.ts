import CONFIG from 'common/config'
import log from 'common/log';

export const init = ( app ) => {
  if(!process.env.RENDER) return

  console.log("CONFIGURING MIDDLEWARE", "HOSTING PROVIDER", "RENDER")
  app.set("trust proxy", 1)
}

