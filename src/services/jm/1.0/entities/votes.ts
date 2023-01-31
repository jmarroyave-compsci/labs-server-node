import { invoke } from 'common/service'

export async function get( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'votes',
    operation: 'get',
    params: params,
    session: session,
  })
}

export async function upVote( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'votes',
    operation: 'upVote',
    params: params,
    session: session,
  })
}

export async function downVote( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'votes',
    operation: 'downVote',
    params: params,
    session: session,
  })
}

export async function neutralVote( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'votes',
    operation: 'neutralVote',
    params: params,
    session: session,
  })
}

