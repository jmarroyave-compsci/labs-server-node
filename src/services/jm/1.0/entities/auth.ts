import { invoke } from 'common/service'

export async function getUserInfo( query, params, session ) {
  return await invoke({
    service: 'auth',
    version: '1.0',
    entity: 'auth',
    operation: 'getUserInfo',
    params: {},
    session: session,
  })
}

export async function loginWithGoogle( query, params, session ) {
  return await invoke({
    service: 'auth',
    version: '1.0',
    entity: 'auth',
    operation: 'loginWithGoogle',
    params: {},
    session: session,
  })
}

export async function loginWithGoogleCallback( query, params, session ) {
  const successLoginUrl = "http://localhost:3000/auth/login/success";
  const failureLoginUrl = "http://localhost:3000/auth/login/error";

  return await invoke({
    service: 'auth',
    version: '1.0',
    entity: 'auth',
    operation: 'loginWithGoogleCallback',
    args: {
      onSuccess: successLoginUrl,
      onFailure: failureLoginUrl,
    },
    session: session,
  })
}

export async function logout( query, params, session ) {
  return await invoke({
    service: 'auth',
    version: '1.0',
    entity: 'auth',
    operation: 'logout',
    params: {},
    session: session,
  })
}