const CONFIG = require('common/config').default;
const service = require('common/service')
const utils = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "user-content"
const VERSION = "1.0"

describe('services: user-content-1.0/votes', () => {

  it('should fetch all votes from a page', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
      },
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'votes',
      operation: 'get',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
    expect(resp).to.have.length(10);
  });

  it('should fetch all votes from a page and a specific instance', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "2"
      },
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'votes',
      operation: 'get',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
    expect(resp).to.have.length(1);
  });

  it('should fetch NO votes from a page and a specific instance', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

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
      entity: 'votes',
      operation: 'get',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
    expect(resp).to.have.length(0);
  });

  it('should force fetch to create if not exists', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "test-instance"
      },
      forceInsert : true,
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'votes',
      operation: 'get',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
  });

  it('should delete an item', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

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
      entity: 'votes',
      operation: 'deleteOne',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
  });

  it('should upvote', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "2",
      },
      user: session.user,
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'votes',
      operation: 'upVote',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp.positive).to.equal(1)
  });

  it('should down vote', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "2",
      },
      user: session.user,
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'votes',
      operation: 'downVote',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp.negative).to.equal(1)
  });


  it('should neutral vote', async () => {
    var params, resp;

    await utils.loadService( SERVICE, VERSION )

    const session = utils.getMockSession()
    params = {
      owner: {
        page: "test",
        instance: "2",
      },
      user: session.user,
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'votes',
      operation: 'neutralVote',
      params: params,
      session: session,
    })

    expect(resp).to.not.be.null;
    expect(resp.negative).to.equal(0)
  });

});