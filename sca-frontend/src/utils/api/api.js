export const throwError = err => {
    const errorResponse = err.response
    let data = {
        message: "An error occured while processing the request"
    }

    if (errorResponse) {
        if (errorResponse.data) {
            data = {
                ...errorResponse.data,
                status: errorResponse.status
            }
        } else {
            data = {
                status: errorResponse.status,
                message: errorResponse.statusText
            }
        }
    }

    throw data
}