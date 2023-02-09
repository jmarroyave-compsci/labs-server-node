import cookieParser from "cookie-parser"

export const init = ( app ) => {
    app.use(cookieParser)
    app.use(middleware)
}

const middleware = function(req, res, next) {
  console.log("COOKIES: ", JSON.stringify(req.cookies, null, 2))
};


