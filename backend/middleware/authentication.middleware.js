const UnauthorizedError = require("../api/errors/UnauthorizedError");
const admin = require("../config/firebase-config");

module.exports = async (req, res, next) => {
    /* if (req.url.includes("/api/user")) {
        return next();
    } */

    try {
        console.log("zzzz", req.headers.authorization);
        const tokenSplit = req.headers.authorization?.split(" ");
        if (!tokenSplit || tokenSplit.length <= 1) {
            throw new UnauthorizedError();
        }

        const userData = await admin.auth().verifyIdToken(tokenSplit[1]);
        if (userData) {
            req.user = userData;
            return next();
        }

        throw new UnauthorizedError();
    } catch (err) {
        next(err);
    }
};
