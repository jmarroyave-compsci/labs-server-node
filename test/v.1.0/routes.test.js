const config = require('../config');
const utils = require('../utils');

const chai = require('chai');
const chaiResponseValidator = require('chai-openapi-response-validator');
const path = require('path');
const expect = chai.expect;

const apiValidator = chaiResponseValidator(`${config.SPECS_DIR}/api.v.1.0.yaml`);

describe('GET V.1.0 /dashboard', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await utils.get('1.0/api/dashboard')
    expect(res.status).to.equal(200);
    chai.use(apiValidator);
    expect(res).to.satisfyApiSpec;
  });
});
