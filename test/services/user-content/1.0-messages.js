const CONFIG = require('common/config').default;
const utils = require('../../utils')
const service = require('common/service')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "user-content"
const VERSION = "1.0"

describe('services: user-content/messages', () => {

  it('should insert and delete a message', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "1",
      },
      text: "message test",
      user: session.user,
      params : JSON.stringify({}, null , 2),
    }

    //console.log("invoking service")

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'messages',
      operation: 'insert',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp.error).to.be.undefined;

    params = {
      id: resp._id
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'messages',
      operation: 'deleteOne',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
  });

});