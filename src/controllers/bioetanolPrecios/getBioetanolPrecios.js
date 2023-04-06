
//Helpers
const {
    bodyResponse
} = require("../helpers/http/bodyResponse");
const {
    validateHeadersParams,
} = require("../helpers/validator/http/requestHeadersParams");
const {
    validateAuthHeaders
} = require("../helpers/auth/headers");


/**
 * @description get an object from the s3 bucket 
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */

module.exports.handler = async (event) => {
    try {
        //Init
        jsonInit = [];
        bodyObj = null;
        bucketContent = null;
        obj = null;


        //-- start with validation Headers  ---
        eventHeaders = await event.headers;

        validateReqParams = await validateHeadersParams(eventHeaders);

        if (!validateReqParams) {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, check missing or malformed headers"
            );
        }

        validateAuth = await validateAuthHeaders(eventHeaders);

        if (!validateAuth) {
            return await bodyResponse(
                statusCode.UNAUTHORIZED,
                "Not authenticated, check x_api_key and Authorization"
            );
        }
        //-- end with validation Headers  ---


        return await bodyResponse(
            statusCode.OK,
            obj
        );

    } catch (error) {
        console.log(error);
        return await bodyResponse(
            statusCode.INTERNAL_SERVER_ERROR,
            "An unexpected error has occurred. Try again"
        );
    }

}
