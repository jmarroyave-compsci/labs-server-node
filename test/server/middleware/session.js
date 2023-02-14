const CONFIG = require('../../../src/common/config').default;
const PARAMS = require('../../../src/server/middleware/_session/session.config')

const chai = require('chai');
const expect = chai.expect;

describe('server: middleware/session', () => {
  it('verify PARAMS', async () => {

    console.log( PARAMS.localParams )

  });

});
