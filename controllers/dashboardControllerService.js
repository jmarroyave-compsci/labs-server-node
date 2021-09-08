'use strict'

const path = require('path');

module.exports.dashboardGet = async function dashboardGet(req, res, next) {

  const DBDashboard = require(path.join(__dirname, '/../db/dashboard'));
  var dashboard;

  try{
    dashboard = await DBDashboard.findOne().select(`-_id`);
    if( dashboard == null)
      dashboard = {}
  } catch ( ex ){
    console.error(ex);
  }  

  res.send( dashboard );

};