import * as fs from 'fs';
import app from "./app";
import log from "./log";
import mongoose from "mongoose"

const config = JSON.parse(fs.readFileSync(`${__dirname}/../app.json`).toString()).env;

const PORT = process.env.PORT || config.DEFAULT_PORT.value;
const DB_SERVER = config.DB_SERVER.value

log.info(`connecting to mongo: ${DB_SERVER}`)
mongoose
  .connect(DB_SERVER, {  })
  .then( async () => {

    app.listen(PORT, () => {
      return log.info(`server is listening on ${PORT}`);
    });

  })
  .catch( ex => log.error(ex))


