class ApiResponse{
    constructor(statusCode = 200,data, message = ""){
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export default ApiResponse;