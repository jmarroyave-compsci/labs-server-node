
export const report = function( message, ex=null ) {

    return {
        error : getErrorMessage(message),
        ex: ex.toString(),
    }
}

const getErrorMessage = function( key ){
    switch( key ){
        case "NOT_AUTH":
            return "not authenticated"
        case "NOT_PARAM":
            return "parameter missing"

    }

    return key
}