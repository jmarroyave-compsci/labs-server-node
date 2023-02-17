const { getConfig } = require('common/config');

const chai = require('chai');
const expect = chai.expect;

describe('server: common/config', () => {
  const CONFIG = getConfig()
  it('should have this properties', async () => {
    expect(CONFIG).to.have.nested.property("SERVER.CACHE");
  });

  it('SERVER.getURL: should return this URLs', async () => {
    expect(CONFIG.SERVER.getURL("/")).to.equal("http://localhost:8081/");
    expect(CONFIG.SERVER.getURL("hola")).to.equal("http://localhost:8081/hola");
  });

});

describe('server: common/config - production', () => {
  const CONFIG = getConfig("prod")
  it('server values that should be freezed', async () => {

  });

});
