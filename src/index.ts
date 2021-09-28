import * as fs from 'fs';
import app from "./app";
import log from "./log";
import mongoose from "mongoose"

const configServer = JSON.parse(fs.readFileSync(`${__dirname}/config/server.json`).toString())
const configDB = JSON.parse(fs.readFileSync(`${__dirname}/config/db.json`).toString())

const PORT = process.env.PORT || configServer.port;

log.info(`connecting to mongo: ${configDB.mongo}`)
mongoose
  .connect(configDB.mongo, {  })
  .then( async () => {

    app.listen(PORT, () => {
      return log.info(`server is listening on ${PORT}`);
    });

  })
  .catch( ex => log.error(ex))


