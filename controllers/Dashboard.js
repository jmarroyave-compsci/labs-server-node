'use strict'

var utils = require('../utils/misc.js');
var Service = require('../service/DashboardService');

module.exports.dashboardGet = function(req, res, next, body) {
  Service.dashboardGet(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
