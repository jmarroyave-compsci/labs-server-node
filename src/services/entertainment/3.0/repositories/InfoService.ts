import config from 'common/config'

export const getDBVersion = async function() {
  return config.DB_VERSION;
};

export const getServerVersion = async function() {
  return config.VERSION;
};
