import app from "./app";
import log from "./log";
import mongoose from "mongoose"
import config from './config'

const PORT = process.env.PORT || config.PORT;
const DB_SERVER = process.env.DB_SERVER || config.DB_SERVER

log.info(`connecting to mongo: ${DB_SERVER}`)
mongoose
  .connect(DB_SERVER, {  })
  .then( async () => {

    app.listen(PORT, () => {
      return log.info(`server is listening on ${PORT}`);
    });

  })
  .catch( ex => log.error(ex))


