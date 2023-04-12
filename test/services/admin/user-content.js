const CONFIG = require('common/config').default;
const service = require('common/service')
const utils = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "admin"
const VERSION = "1.0"

describe('services: admin-1.0/user-content', () => {

  it('should fetch all messages', async () => {
    var params, resp;

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
      },
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'user-content',
      operation: 'messages',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
  });

});