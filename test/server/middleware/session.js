const { getConfig } = require('common/config');
const { getParameters } = require('server/middleware/_session/session.config')
const { hash } = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

describe('server: middleware/session', () => {
  const CONFIG = getConfig("prod")
  it('verify production PARAMS', async () => {
    const PARAMS = getParameters(CONFIG, false)
    //console.log(PARAMS)
    expect(hash(JSON.stringify(PARAMS))).to.equal("a3e041a74d171e2e780506d34a160e95");
  });

});
