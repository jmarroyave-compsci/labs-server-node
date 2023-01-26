import { invoke } from 'common/service'

export async function insert( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'comments',
    operation: 'insert',
    params: params,
    session: session,
  })
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

export async function getAll( query, params, session ) {
  return await invoke({
    service: 'user-content',
    version: '1.0',
    entity: 'comments',
    operation: 'getAll',
    params: query,
    session: session,
  })
}

