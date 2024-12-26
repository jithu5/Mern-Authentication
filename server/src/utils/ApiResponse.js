class ApiResponse{
    constructor(statusCode = 200,data, message = "",success = statusCode <400){
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        this.success = success;
    }
}

export default ApiResponse;