import DBInfo from '../models/_';
import config from '../config'

export const getDBVersion = async function() {
  const data =  await DBInfo.findOne().sort({created: -1});
  return data.db.version;
};

export const getServerVersion = async function() {
  return config.VERSION;
};
