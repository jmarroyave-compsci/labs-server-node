import { invoke } from 'common/service'

export const getMessages = async function( query, params, session ) {
  const resp = await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'messages',
    operation: 'get',
    params: params,
    session: session,
  })
  
  return resp
};

