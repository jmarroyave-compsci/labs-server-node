import config from 'common/config'

export const getServerVersion = async function() {
  return config.VERSION;
};
