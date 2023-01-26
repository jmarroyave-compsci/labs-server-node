
export const getSession = function( req, session={} ) {
    const sess = {
        ...(req?.['session'] ?? {}), 
        user: req?.['user'] ?? null,
        endpoint: req?.originalUrl ?? null,
        agent: req?.useragent ?? null,
        ...session,
    }

    if(!sess.service){
        sess.service = sess?.endpoint?.split("/")?.[1]
    }

    //console.log("SESSION:", JSON.stringify(req?.['user'], null, 2))

    return sess
}

