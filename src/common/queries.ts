
export const getWhereFromQuery = function(query) {
  const op = (query) ? JSON.parse(query) : {}

  const where = {}
  const formatValue = ( value ) => {
    if(value.includes(" "))
        return value.replace(/ /g, "_")
    return value;
  }

  switch( op.op ){
    case "eq":
        where[op.field] = formatValue(op.value);
        break;
    case "range":
        where[op.field] = { "$gte" : op.value[0], "$lt" : op.value[1]};
        break;
    case "len":
        where[op.field] = { "$size" : formatValue(op.value) };
        break;
    case "lt":
        where[op.field] = { "$lt" : formatValue(op.value) };
        break;
    case "lte":
        where[op.field] = { "$lte" : formatValue(op.value) };
        break;
    case "gt":
        where[op.field] = { "$gt" : formatValue(op.value) };
        break;
    case "gte":
        where[op.field] = { "$gte" : formatValue(op.value) };
        break;
    case "in":
        where[op.field] = { "$in" : op.value };
        break;
  }

  return where
}

