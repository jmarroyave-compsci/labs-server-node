const CONFIG = require('common/config').default;
const service = require('common/service')
const utils = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "user-content"
const VERSION = "1.0"

describe('services: user-content-1.0/comments++', () => {

  it('should fetch all comments from a page', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "http%3A%2F%2Flocalhost%3A3000%2Fblog%2F23-02-14-frontend-hosting",
      },
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'comments',
      operation: 'getAll',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
    expect(resp).to.have.length(10);
    console.log(resp)
  });

});