import dotenv from 'dotenv'

var result = dotenv.config()

const LOCAL = (!process.env.DB_SERVER || process.env.DEFAULT_DB_SERVER.includes("127.0.0.1"))

const config = {
  PORT: process.env.PORT || process.env.DEFAULT_PORT,
  DB_SERVER: process.env.DB_SERVER || process.env.DEFAULT_DB_SERVER,
  WEB_SERVER: process.env.DEFAULT_WEB_SERVER,
  VERSION: process.env.VERSION,
  CACHE_SERVER: (LOCAL && process.env.CACHE_SERVER == "true") ? true : false,
  PLUGINS: {
    GOOGLE_ANALYTICS: {
      BASE_URL: process.env.PLUGINS_GOOGLE_ANALYTICS_BASE_URL,
      TRACK_ID: process.env.PLUGINS_GOOGLE_ANALYTICS_TRACK_ID,
    }
  },
  LOCAL: LOCAL
}



export default config;