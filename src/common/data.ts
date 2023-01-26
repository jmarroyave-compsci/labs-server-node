import crypto from 'crypto';

export const getHash = function( str ) {
  return crypto.createHash('md5').update(str).digest('hex');
};

