//Environment vars
// const DEFAULT_REGION = require(process.env.DEFAULT_REGION);

//External
const {
    DynamoDBDocumentClient,
    PutCommand
} = require("@aws-sdk/lib-dynamodb");
const {
    DynamoDBClient
} = require("@aws-sdk/client-dynamodb");
//Enums
const {
    statusCode
} = require("../../enums/http/statusCode");
//Helpers
const {
    bodyResponse
} = require("../../helpers/http/bodyResponse");
const {
    validateHeadersParams,
} = require("../../helpers/validator/http/requestHeadersParams");
const {
    validateAuthHeaders
} = require("../../helpers/auth/headers");
// const {
//     dynamoDBClient
// } = require("../../helpers/dynamodb/client");
//Const/Vars
let eventBody;
let eventHeaders;
let validateReqParams;
let validateAuth;
let obj;

/**
 * @description Function to obtain all the objects of the bioethanol prices table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
    try {
        //Init
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

        //-- start with dynamoDB operations  ---
        const params = {
            TableName: "bioetanolPrecios",
            Item: {
                id: "hasgdhashdg",
                periodo: "2023/12/01",
                bioetCanAzucar: "329,309",
                bioetMaiz: "351,00"
            },
        };
        try {
            const client = new DynamoDBClient({});

            const dynamo = await DynamoDBDocumentClient.from(client);

            const data = await dynamo.send(new PutCommand(params));
            console.log("Success - item added or updated", data);
        } catch (err) {
            console.log("Error", err.stack);
        }

        //-- end with dynamoDB operations  ---
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