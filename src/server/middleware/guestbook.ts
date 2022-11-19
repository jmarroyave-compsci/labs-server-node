import * as GuestBook from 'services/global/1.0/repositories/GuestsService';

const middleware = function (req, res, next) {
    GuestBook.saveGuest(req)
    next();
}


export default middleware