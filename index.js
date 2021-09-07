'use strict';

const mongoose = require("mongoose") // new
const path = require('path');
const fs = require('fs');
const http = require('http');

const config = JSON.parse(fs.readFileSync('./.config.json'))

// Connect to MongoDB database
mongoose
  .connect(config.mongo, { useNewUrlParser: true })
  .then(() => {
    start()
  })
  .catch( ex => console.error(ex))


function start(){
  console.log("starting")

  var express = require("express");
  var app = express();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json({
    strict: false
  }));
  var oasTools = require('oas-tools');
  var jsyaml = require('js-yaml');
  const PORT = process.env.PORT || 8080;
;

  var spec = fs.readFileSync(path.join(__dirname, '/api/oas-doc.yaml'), 'utf8');
  var oasDoc = jsyaml.safeLoad(spec);

  var options_object = {
    controllers: path.join(__dirname, './controllers'),
    loglevel: 'info',
    strict: false,
    router: true,
    validator: true
  };


  console.log("configuring")
  oasTools.configure(options_object);

  oasTools.initialize(oasDoc, app, function() {
    http.createServer(app).listen(PORT, function() {
      console.log("App running at http://localhost:" + PORT);
      console.log("________________________________________________________________");
      if (options_object.docs !== false) {
        console.log('API docs (Swagger UI) available on http://localhost:' + PORT + '/docs');
        console.log("________________________________________________________________");
      }
    });
  });


  app.get('/info', function(req, res) {
    res.send({
      info: "This API was generated using oas-generator!",
      name: oasDoc.info.title
    });
  });

}

