// Set up Chai
const chai = require('chai');
const chaiResponseValidator = require('chai-openapi-response-validator');
const path = require('path');
const expect = chai.expect;
const utils = require('./utils');

chai.use(chaiResponseValidator(path.join(__dirname, '/../files/api.yaml')));

describe('GET /dashboard', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await utils.get('dashboard')

    expect(res.status).to.equal(200);

    // Assert that the HTTP response satisfies the OpenAPI spec
    expect(res).to.satisfyApiSpec;
  });
});
