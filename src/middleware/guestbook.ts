import * as GuestBook from 'api/global/services/GuestsService';

const middleware = function (req, res, next) {
    GuestBook.saveGuest(req)
    next();
}


export default middleware