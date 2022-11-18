import config from 'config/config'

export const getDBVersion = async function() {
  return config.DB_VERSION;
};

export const getServerVersion = async function() {
  return config.VERSION;
};
