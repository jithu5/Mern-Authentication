class ApiError extends Error {
    constructor(statusCode, message,errors=[],errStack) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;
        this.data = null;

        if (this.errStack) {
            this.errStack = errStack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;