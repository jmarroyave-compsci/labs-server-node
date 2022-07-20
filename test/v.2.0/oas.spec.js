const config = require('../config');
const utils = require('../utils');

const chai = require('chai');
const chaiResponseValidator = require('chai-openapi-response-validator');
const path = require('path');
const expect = chai.expect;

const apiValidator = chaiResponseValidator(`${config.SPECS_DIR}/api.v.2.0.yaml`);

describe('GET V.2.0 /dashboard/home', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await utils.get('2.0/api/dashboard/home', false)
    expect(res.status).to.equal(200);
    chai.use(apiValidator);
    expect(res).to.satisfyApiSpec;
  });
});

describe('GET V.2.0 /dashboard/movies', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await utils.get('2.0/api/dashboard/movies', false)
    expect(res.status).to.equal(200);
    chai.use(apiValidator);
    expect(res).to.satisfyApiSpec;
  });
});

describe('GET V.2.0 /dashboard/podcasts', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await utils.get('2.0/api/dashboard/podcasts', false)
    expect(res.status).to.equal(200);
    chai.use(apiValidator);
    expect(res).to.satisfyApiSpec;
  });
});

describe('GET V.2.0 /dashboard/people', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await utils.get('2.0/api/dashboard/people', false)
    expect(res.status).to.equal(200);
    chai.use(apiValidator);
    expect(res).to.satisfyApiSpec;
  });
});


