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

  return await invoke({
    service: 'communication',
    version: '1.0',
    entity: 'mail',
    operation: 'send',
    params: {
      to: "jmarroyave.compsci@gmail.com",
      from: "jmarroyave.compsci",
      subject: "comment inserted",
      bodyText: params.text,
    },
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

