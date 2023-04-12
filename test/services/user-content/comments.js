const CONFIG = require('common/config').default;
const service = require('common/service')
const utils = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "user-content"
const VERSION = "1.0"

describe('services: user-content-1.0/comments', () => {

  it('should fetch all comments from a page', async () => {
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
      entity: 'comments',
      operation: 'get',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
    expect(resp).to.have.length(10);
    //console.log(resp)
  });

  it('should fetch all comments from a page and a specific instance', async () => {
    var params, resp;

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "3"
      },
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'comments',
      operation: 'get',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
    expect(resp).to.have.length(1);
    //console.log(resp)
  });

  it('should fetch NO comments from a page and a specific instance', async () => {
    var params, resp;

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "test-instance"
      },
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'comments',
      operation: 'get',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
    expect(resp).to.have.length(0);
  });

  it('should insert a comment', async () => {
    var params, resp;

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "test-comment",
      },
      text: "test comment that will be deleted",
      user: session.user,
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'comments',
      operation: 'insert',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
  });

  it('should delete a comment', async () => {
    var params, resp;

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "test-comment",
      },
      user: session.user,
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'comments',
      operation: 'get',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;

    params = {
      id: resp[0].id
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

    for( var i = 0; i < 10; i++){
      params = {
        owner: {
          page: "test",
          instance: i.toString(),
        },
        text: `test comment ${i}`,
        user: session.user,
      }

      resp = await service.invoke({
        service: SERVICE,
        version: VERSION,
        entity: 'comments',
        operation: 'insert',
        params: params,
        session: session,
      })

      expect(resp).to.not.be.null;

    }
  });

});