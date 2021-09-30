import app from "./app";
import log from "./log";
import mongoose from "mongoose"
import config from './config'

const PORT = process.env.PORT || config.PORT;
const DB_SERVER = process.env.DB_SERVER || config.DB_SERVER

log.info("")
log.info("")
log.info("")
log.info("")
log.info("-".repeat(50))
log.info("STARTING SERVER")
log.info("-".repeat(50))
log.info(`VERSION:\t${config.VERSION}`)
log.info(`PORT:\t${PORT}`)
log.info(`DB SERVER:\t${DB_SERVER}`)
log.info("-".repeat(50))
mongoose
  .connect(DB_SERVER, {  })
  .then( async () => {
    log.info("CONNECTED TO DB \t\t OK")
    app.listen(PORT, () => {
      log.info(`LISTENING ON PORT [${PORT}] \t OK`)
      log.info("-".repeat(50))
      log.info("")
      log.info("")
      log.info("")
      log.info("")
    });

  })
  .catch( ex => log.error(ex))


