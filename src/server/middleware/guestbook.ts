import * as GuestBook from 'services/global/1.0/repositories/GuestsService';

export const init = ( app ) => {
    app.use(middleware)
}

const middleware = function (req, res, next) {
    GuestBook.saveGuest(req)
    next();
}