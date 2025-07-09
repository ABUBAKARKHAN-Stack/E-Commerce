const getErrorTitle = (status: number): string => {
    switch (status) {
        case 400:
            return "Bad Request";
        case 401:
            return "Unauthorized";
        case 403:
            return "Forbidden";
        case 404:
            return "Not Found";
        case 409:
            return "Conflict";
        case 422:
            return "Unprocessable Entity";
        case 429:
            return "Too Many Requests";
        case 500:
            return "Internal Server Error";
        case 503:
            return "Service Unavailable";
        default:
            return "Unexpected Error";
    }
}

export {
    getErrorTitle
}