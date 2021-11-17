
export const getWhereFromQuery = function(query) {
  const op = (query) ? JSON.parse(query) : {}

  const where = {}

  switch( op.op ){
    case "eq":
        where[op.field] = op.value;
        break;
    case "range":
        where[op.field] = { "$gte" : op.value[0], "$lt" : op.value[1]};
        break;
    case "len":
        where[op.field] = { "$size" : op.value };
        break;
    case "lt":
        where[op.field] = { "$lt" : op.value };
        break;
    case "lte":
        where[op.field] = { "$lte" : op.value };
        break;
    case "gt":
        where[op.field] = { "$gt" : op.value };
        break;
    case "gte":
        where[op.field] = { "$gte" : op.value };
        break;
  }

  return where
}

