const CONFIG = require('../../../src/common/config').default;

const chai = require('chai');
const expect = chai.expect;

describe('server: common/config', () => {
  it('verify .env loading', async () => {
    expect(CONFIG).to.have.nested.property("SERVER.CACHE");
  });

  it('SERVER.getURL', async () => {

    expect(CONFIG.SERVER.getURL("/")).to.equal("http://localhost:8080/");
    expect(CONFIG.SERVER.getURL("hola")).to.equal("http://localhost:8080/hola");

    CONFIG.SERVER.PORT.EXT.HTTPS = true
    expect(CONFIG.SERVER.getURL("hola")).to.equal("https://localhost:8080/hola");
  });

});
