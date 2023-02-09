import { invoke } from 'common/service'
import { send as notifyMe } from './notify-me'

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
  const resp = await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'votes',
    operation: 'upVote',
    params: params,
    session: session,
  })

  await notifyMe(query, {
    subject: "up vote",
    body: params.owner,    
  }, session)

  return resp
}

export async function downVote( query, params, session ) {
  const resp = await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'votes',
    operation: 'downVote',
    params: params,
    session: session,
  })

  await notifyMe(query, {
    subject: "down vote",
    body: params.owner,    
  }, session)

  return resp
}

export async function neutralVote( query, params, session ) {
  const resp = await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'votes',
    operation: 'neutralVote',
    params: params,
    session: session,
  })

  await notifyMe(query, {
    subject: "neutral vote",
    body: params.owner,    
  }, session)

  return resp
}

