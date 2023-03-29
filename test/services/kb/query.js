const CONFIG = require('common/config').default;
const service = require('common/service')
const utils = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "kb"
const VERSION = "1.0"

describe('services: kb-1.0/query', () => {

  it('should prompt openai', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      prompt: "hello, who am i talking to?",
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'query',
      operation: 'openAI',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
  });

});