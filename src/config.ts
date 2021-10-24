import * as fs from 'fs'; 
import dotenv from 'dotenv'

var CONF = dotenv.config().parsed
var _package_ = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`).toString());

const LOCAL = (!process.env.DB_SERVER && process.env.DEFAULT_DB_SERVER.includes("127.0.0.1"))

const config = {
  PORT: process.env.PORT || process.env.DEFAULT_PORT,
  DB_SERVER: process.env.DB_SERVER || process.env.DEFAULT_DB_SERVER,
  WEB_SERVER: process.env.DEFAULT_WEB_SERVER,
  VERSION: _package_.version,
  CACHE_SERVER: (LOCAL && process.env.CACHE_SERVER == "true") ? true : false,
  PLUGINS: {
    GOOGLE_ANALYTICS: {
      BASE_URL: process.env.PLUGINS_GOOGLE_ANALYTICS_BASE_URL,
      TRACK_ID: process.env.PLUGINS_GOOGLE_ANALYTICS_TRACK_ID,
    }
  },
  LOCAL: LOCAL
}


console.log(config)


export default config;