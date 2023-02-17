import { invoke } from 'common/service'
import { send as notifyMe } from './notify-me'

export async function insert( query, params, session ) {
  const resp = await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'messages',
    operation: 'insert',
    params: params,
    session: session,
  })

  return resp
}

export async function deleteOne( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'messages',
    operation: 'deleteOne',
    params: params,
    session: session,
  })
}

