const { getConfig } = require('common/config');
const { getParameters } = require('server/middleware/_session/session.config')
const { hash } = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

describe('server: middleware/auth', () => {
  const CONFIG = getConfig("prod")
  it('verify google params', async () => {
    //console.log(CONFIG.SERVER.getURL('/admin/1.0/auth/login/google/callback'))
    expect(hash( CONFIG.SERVER.getURL('/admin/1.0/auth/login/google/callback') )).to.equal("8656f160c14d6c416ee1ea130493bc28");
  });

  it('verify github params', async () => {
    //console.log(CONFIG.SERVER.getURL('/admin/1.0/auth/login/github/callback'))
    expect(hash( CONFIG.SERVER.getURL('/admin/1.0/auth/login/github/callback') )).to.equal("89ca7d06947faff2e21189a3d00453b1");
  });
});
