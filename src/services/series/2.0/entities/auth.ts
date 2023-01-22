import { invoke } from 'common/service'

export async function getUserInfo( query, params, session ) {
  return invoke({
    service: 'auth',
    version: '1.0',
    entity: 'auth',
    operation: 'getUserInfo',
    params: {},
  })
}

export async function loginWithGoogle( query, params, session ) {
  return invoke({
    service: 'auth',
    version: '1.0',
    entity: 'auth',
    operation: 'loginWithGoogle',
    params: {},
  })
}

export async function loginWithGoogleCallback( query, params, session ) {
  const successLoginUrl = "http://localhost:3000/login/success";
  const failureLoginUrl = "http://localhost:3000/login/error";

  return invoke({
    service: 'auth',
    version: '1.0',
    entity: 'auth',
    operation: 'loginWithGoogleCallback',
    params: {
      onSuccess: successLoginUrl,
      onFailure: failureLoginUrl,
    },
  })
}

export async function logout( query, params, session ) {
  return invoke({
    service: 'auth',
    version: '1.0',
    entity: 'auth',
    operation: 'logout',
    params: {},
  })
}