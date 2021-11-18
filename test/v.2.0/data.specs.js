const fs = require('fs')
const config = require('../config');
const utils = require('../utils');

const chai = require('chai');
const chaiResponseValidator = require('chai-openapi-response-validator');
const path = require('path');
const expect = chai.expect;

const tests = fs.readdirSync( `${__dirname}/data` );
describe('Data expected tests', () => {
  for( test of tests){
    const data = JSON.parse(fs.readFileSync(`${__dirname}/data/${test}`).toString())
    it(`[${test.replace(".json", "")}] - response must satisfy expected data`, async () => {
      const response = await utils.graphQL(JSON.stringify(data.body), false);
      expect(response.status).to.equal(200);
      expect(JSON.stringify(response.data)).to.equal(JSON.stringify(data.data));
    });
  }
});



