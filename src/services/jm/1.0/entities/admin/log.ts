import { invoke } from 'common/service'

export const get = async function( query, params, session ) {
  const resp = await invoke({
    service: 'admin',
    version: '1.0',
    entity: 'log',
    operation: 'get',
    params: Object.keys(query).length == 0 ? params : query ,
    session: session,
  })
  
  return resp
};

export const count = async function( query, params, session ) {
  const resp = await invoke({
    service: 'admin',
    version: '1.0',
    entity: 'log',
    operation: 'count',
    params: Object.keys(query).length == 0 ? params : query ,
    session: session,
  })
  
  return { count: resp }
};

