const CONFIG = require('common/config').default;
const service = require('common/service')
const utils = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "jm"
const VERSION = "1.0"

describe('services: jm-1.0/admin-messages', () => {

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
      entity: 'admin.messages',
      operation: 'get',
      params: params,
      session: session,
    })

    //console.log(resp)

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
  });

});