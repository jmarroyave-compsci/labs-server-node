const CONFIG = require('common/config').default;
const service = require('common/service')
const utils = require('../../utils')

const chai = require('chai');
const expect = chai.expect;

const SERVICE = "series"
const VERSION = "2.0"

describe('services: series-2.0/lists', () => {

  it('should fetch all lists', async () => {
    var params, resp;

    const session = utils.getMockSession()
    params = {
      lists: 'home_1'
    }

    resp = await service.invoke({
      service: SERVICE,
      version: VERSION,
      entity: 'lists',
      operation: 'get',
      params: params,
      session: session,
    })

    //console.log(resp)

    expect(resp).to.not.be.null;
    expect(resp).to.be.an('array');
    expect(resp).to.have.length(1);
    expect(resp[0].items).to.have.length(10);
  });

});