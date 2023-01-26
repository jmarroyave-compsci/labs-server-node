import { invoke } from 'common/service'

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

