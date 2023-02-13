import { invoke } from 'common/service'
import { isAdmin } from 'common/security'

export async function isAdmin( query, params, session ) {
  const authorized = await isAdmin(session)
  if(authorized){
    return { auth: true, msg: "done" }
  } else{
    return { auth: false, msg: "not admin" }
  }
}

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

export async function loginWithGithub( query, params, session ) {
  return await invoke({
    service: 'admin',
    version: '1.0',
    entity: 'auth',
    operation: 'loginWithGithub',
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