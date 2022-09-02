function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        // Custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ message: err.message || "Invalid Token" });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ ...err });
    }

    // Default to 500 server error
    return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
