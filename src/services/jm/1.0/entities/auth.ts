import { invoke } from 'common/service'

export async function getUserInfo( query, params, session ) {
  return await invoke({
    service: 'admin',
    version: '1.0',
    entity: 'auth',
    operation: 'getUserInfo',
    params: {},
    session: session,
  })
}

export async function loginWithGoogle( query, params, session ) {
  return await invoke({
    service: 'admin',
    version: '1.0',
    entity: 'auth',
    operation: 'loginWithGoogle',
    params: {},
    session: session,
  })
}

export async function logout( query, params, session ) {
  return await invoke({
    service: 'admin',
    version: '1.0',
    entity: 'auth',
    operation: 'logout',
    params: {},
    session: session,
  })
}