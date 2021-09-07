// Set up Chai
const chai = require('chai');
const expect = chai.expect;

// Import this plugin
const chaiResponseValidator = require('chai-openapi-response-validator');

// Load an OpenAPI file (YAML or JSON) into this plugin
chai.use(chaiResponseValidator('C:/dev/projects/portfolio/test2/output/api/oas-doc.yaml'));

// Write your test (e.g. using Mocha)
describe('GET /movies', () => {
  it('should satisfy OpenAPI spec', async () => {
    // Get an HTTP response from your server (e.g. using axios)
    const res = await get('movies')

    expect(res.status).to.equal(200);

    // Assert that the HTTP response satisfies the OpenAPI spec
    expect(res).to.satisfyApiSpec;
  });
  it('should satisfy OpenAPI spec model', async () => {
    // Get an HTTP response from your server (e.g. using axios)
    const res = await get('movies')

    expect(res.status).to.equal(200);

    for( var d in res.data ){
      d = res.data[d];
      console.log(d)
      expect(d).to.satisfySchemaInApiSpec('Movie');  
    }
    
  });
});



const SERVER = "http://localhost:8080/api"
async function get(endpoint){
  const axios = require('axios')
  const uri = `${SERVER}/${endpoint}`;
  console.log(uri)
  const res = await axios.get(uri);
  return res;
}