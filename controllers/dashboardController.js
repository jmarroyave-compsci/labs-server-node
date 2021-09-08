'use strict'

var service = require('./dashboardControllerService');

module.exports.dashboardGet = function dashboardGet(req, res, next) {
  service.dashboardGet(req.swagger.params, res, next);
};