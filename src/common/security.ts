import { invoke } from 'common/service'

export const isAuthenticated = async function( session ) {
    if(!session) return false
    if(!session.user) return false
    return true
}

export const isAuthorized = async function( session, role ) {
    if(! await isAuthenticated( session ))  return false

    const authorized = await invoke({
        service: 'admin',
        version: '1.0',
        entity: 'user',
        operation: 'authorized',
        params: {
          role: role,
        },
        session: session,
    })

    return authorized
}

export const isAdmin = async function( session ) {
    return await isAuthorized(session, "admin")
}