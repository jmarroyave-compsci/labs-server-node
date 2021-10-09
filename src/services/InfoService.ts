import DBInfo from '../models/info';
import DBInfoAboutSource from '../models/info_about_source';
import config from '../config'

export const getDBVersion = async function() {
  console.log("voy")
  const data =  await DBInfo.findOne().sort({created: -1});
  return data['db']['version'];
};

export const getServerVersion = async function() {
  return config.VERSION;
};

export const getAbout = async function() {
  const data =  await DBInfoAboutSource.find().sort({added: -1}); 

  return { sources : data, fetched: [{name: "test", added: "2021-09-09", count: 1000}]};
};
