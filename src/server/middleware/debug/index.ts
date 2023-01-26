
export const init = ( app ) => {
    //app.use(middleware)
}

const middleware = function(req, res, next) {
  // .header and .set is an alias pair
  const _header = res.header.bind(res); 
  const _send = res.send.bind(res);

  res.header = res.set = (field, val) => {
    console.trace('.header/.set called', field, val);
    console.log('-----');
    return _header(field, val);
  }

  res.send = (body) => {
    console.trace('.send called', body);
    console.log('-----');
    return _send(body);
  }

  next();
}