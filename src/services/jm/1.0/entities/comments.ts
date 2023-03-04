import { invoke } from 'common/service'
import { send as notifyMe } from './notify-me'

export async function insert( query, params, session ) {
  const resp = await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'comments',
    operation: 'insert',
    params: params,
    session: session,
  })

  await notifyMe(query, {
    subject: "comment inserted",
    body: params.text,    
  }, session)


  return resp
}

export async function deleteOne( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'comments',
    operation: 'deleteOne',
    params: params,
    session: session,
  })
}

export async function get( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'comments',
    operation: 'get',
    params: query,
    session: session,
  })
}

export async function reply( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'comments',
    operation: 'reply',
    params: params,
    session: session,
  })
}

export async function getReplies( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'comments',
    operation: 'getReplies',
    params: params,
    session: session,
  })
}
