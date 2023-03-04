const CONFIG = require('common/config').default;
const service = require('common/service')
const utils = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "user-content"
const VERSION = "1.0"
const COMMENT_ID = "63ff9ae9d484dfeb888bf347"

describe('services: user-content-1.0/comments-replies', () => {

  it('should fetch all replies from a comment', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      id: COMMENT_ID,
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'comments',
      operation: 'getReplies',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
    expect(resp).to.have.length(10);
    //console.log(resp)
  });

  it('should insert and delete a reply', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      id: COMMENT_ID,
      text: "reply text to a comment",
      user: session.user,
    }

    //console.log("invoking service")

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'comments',
      operation: 'reply',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;

    params = {
      id: resp._id
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'comments',
      operation: 'deleteOne',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
  });

  it('should insert test data', async () => {
    return

    var params, resp;

    const session = utils.getMockSession()
    await utils.loadService( SERVICE, VERSION )
  
    for( var i = 0; i < 10; i++){
      params = {
        id: COMMENT_ID,
        text: `reply text to a comment ${i}`,
        user: session.user,
      }

      resp = await service.invoke({
        service: SERVICE,
        version: VERSION,
        entity: 'comments',
        operation: 'reply',
        params: params,
        session: session,
      })
    }
  });

});