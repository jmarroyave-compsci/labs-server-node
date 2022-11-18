import * as GuestBook from 'api/global/1.0/services/GuestsService';

const middleware = function (req, res, next) {
    GuestBook.saveGuest(req)
    next();
}


export default middleware