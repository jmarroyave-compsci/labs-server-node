'use strict';

const mongoose = require("mongoose") // new
const path = require('path');
const fs = require('fs');
const http = require('http');
const cors = require('cors');

const graphql = require('graphql');
const { graphqlHTTP } = require('express-graphql')
const OtG = require('openapi-to-graphql')

console.log("loading configuration files")
const config_server = JSON.parse(fs.readFileSync('./config/server.json'))
const config_db = JSON.parse(fs.readFileSync('./config/db.json'))

const PORT = process.env.PORT || config_server.port;

console.log("connecting to mongo:", config_db.mongo)
mongoose
  .connect(config_db.mongo, { useNewUrlParser: true })
  .then( async () => {
    await start()
  })
  .catch( ex => console.error(ex))


async function start(){
  console.log("starting server")

  const express = require("express");
  const bodyParser = require('body-parser');
  const jsyaml = require('js-yaml');
  const morgan = require('morgan')

  console.log(" -", "configuring middleware")
  var app = express();
  app.use(cors())
  app.use(bodyParser.json({
    strict: false
  }));
  app.use(morgan('tiny'))


  var oas_file = fs.readFileSync(path.join(__dirname, '/files/api.yaml'), 'utf8');
  var oasDoc = jsyaml.safeLoad(oas_file);
 

  console.log(" -", "routes")

  const {schema} = await OtG.createGraphQLSchema(oasDoc)
  app.use('/graphql', graphqlHTTP({schema: schema, graphiql: true, pretty: false, raw: true}));

  app.get('/api/movies', function (req, res) {
    var controller = require('./controllers/Movies');
    controller.moviesGet(req, res);
  })

  app.get('/api/dashboard', function (req, res) {
    var controller = require('./controllers/Dashboard');
    controller.dashboardGet(req, res);
  })

  app.use('/docs', express.static('docs'))

  http.createServer(app).listen(PORT, function() {
    console.log("Server running at http://localhost:" + PORT);
    console.log("_".repeat(80));
  });
}

