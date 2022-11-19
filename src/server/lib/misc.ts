import { Response } from "express";
import * as fs from 'fs';

const ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

export const respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

export const writeJSON = function(response: Response, arg1: object, arg2?: object) {
  let code;
  let payload;

  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJSON(response, arg1["payload"], arg1["code"]);
    return;
  }

  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }

  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}


export const getParams = function(req) {
  const params = req.query || {}
  return params;
}
