import * as service from '../repositories/HistoryService';

export async function addSearched( query, params, session ) {
    return service.addSearched( session.id, query.qry )
}


