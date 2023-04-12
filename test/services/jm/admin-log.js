const CONFIG = require('common/config').default;
const service = require('common/service')
const utils = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "jm"
const VERSION = "1.0"

describe('services: jm-1.0/admin-log', () => {

  it('should count all logs', async () => {
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
      entity: 'admin.log',
      operation: 'count',
      params: {
        d: '2023-04-11'
      },
      session: session,
    })

    //console.log(resp)

    expect(resp).to.not.be.null;
    expect(resp.count).to.be.equal(1122);
  });

});