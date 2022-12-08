import { default as P }  from "bluebird";
import * as docs from 'common/docs';

export async function getDocs( query, params, session ){
  console.log("docs")
  return await docs.getDocs( { version: "2.0"} );
};

export async function getSpecs( query, params, session ){
  console.log("specs")
  return await docs.getSpecs( "entertainment", "3.0" );
};