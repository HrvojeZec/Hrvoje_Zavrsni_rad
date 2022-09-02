class ValidationError extends Error {
    constructor(messages) {
        super();
        this.name = "ValidationError";
        this.messages = messages;
    }
}

module.exports = ValidationError;
