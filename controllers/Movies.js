'use strict'

var utils = require('../utils/misc.js');
var Service = require('../service/MoviesService');

module.exports.moviesGet = function(req, res, next, body) {
  var params = utils.getParams(req);

  Service.moviesGet(params)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};