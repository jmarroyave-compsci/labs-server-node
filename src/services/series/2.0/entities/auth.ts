import { invoke } from 'common/service'

export async function getUserInfo( query, params, session ) {
  return invoke({
    service: 'admin',
    version: '1.0',
    entity: 'auth',
    operation: 'getUserInfo',
    params: {},
  })
}

export async function loginWithGoogle( query, params, session ) {
  return invoke({
    service: 'admin',
    version: '1.0',
    entity: 'auth',
    operation: 'loginWithGoogle',
    params: {},
  })
}

export async function logout( query, params, session ) {
  return invoke({
    service: 'admin',
    version: '1.0',
    entity: 'auth',
    operation: 'logout',
    params: {},
  })
}