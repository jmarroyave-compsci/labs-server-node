// Set up Chai
const chai = require('chai');
const chaiResponseValidator = require('chai-openapi-response-validator');
const path = require('path');
const expect = chai.expect;
const utils = require('./utils');

chai.use(chaiResponseValidator(path.join(__dirname, '/../files/api.yaml')));

describe('GET /movies', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await utils.get('movies')
    expect(res.status).to.equal(200);
    expect(res).to.satisfyApiSpec;
  });
  it('should satisfy OpenAPI spec model', async () => {
    const res = await utils.get('movies')
    expect(res.status).to.equal(200);
    for( var d in res.data ){
      d = res.data[d];
      console.log(d)
      expect(d).to.satisfySchemaInApiSpec('Movie');  
    }
    
  });
});

