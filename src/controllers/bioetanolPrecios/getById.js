//Enums
const { statusCode } = require("../../enums/http/statusCode");
const { value } = require("../../enums/general/values");
//Helpers
const { bodyResponse } = require("../../helpers/http/bodyResponse");
const {
  validatePathParameters,
} = require("../../helpers/http/queryStringParams");
const {
  getOneItem,
} = require("../../helpers/dynamodb/operations/getOneDynamoDB");
const {
  validateHeadersAndKeys,
} = require("../../helpers/validations/headers/validateHeadersAndKeys");

//Const/Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME;
let eventHeaders;
let checkEventHeadersAndKeys;
let validatePathParam;
let key;
let idParam;
let item;
let msg;
let code;

/**
 * @description Function to get a product of the bioethanol prices table according to id
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    item = value.IS_NULL;
    key = value.IS_NULL;

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != value.IS_NULL) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with path parameters  ---
    idParam = await event.pathParameters.id;

    validatePathParam = await validatePathParameters(idParam);

    if (!validatePathParam) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "Bad request, check malformed id to get bioethanol prices based on your id"
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    key = { id: idParam };

    item = await getOneItem(BIOET_PRECIOS_TABLE_NAME, key);

    if (item == value.IS_NULL || item.IS_UNDEFINED) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "The Bioetanol prices object with the requested id is not found in the database"
      );
    }

    return await bodyResponse(statusCode.OK, item);

    //-- end with dynamodb operations  ---
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in GET BY ID lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};
