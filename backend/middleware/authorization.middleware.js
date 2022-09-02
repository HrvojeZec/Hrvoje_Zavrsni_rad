const UnauthorizedError = require("../api/errors/UnauthorizedError");
const { getUserRole } = require("../api/roles/roles-service");

module.exports = (role) => {
    return async (req, res, next) => {
        try {
            const userRole = await getUserRole(req.user.uid);
            if (role === userRole) {
                next();
            } else {
                throw new UnauthorizedError();
            }
        } catch (err) {
            console.error(err);
            next(new UnauthorizedError("Invalid Authorization"));
        }
    };
};
