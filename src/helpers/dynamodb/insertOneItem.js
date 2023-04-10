//External
const {
    PutItemCommand
} = require("@aws-sdk/client-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("./dynamoDBClient");
const {
    formatToString
} = require("../../helpers/format/formatToString");
//Const-vars 
let dynamo;
let metadata;
let requestId;


/**
 * @description insert one item in the database
 * @param {Object} params object json type
 * @returns a metadata with the information of the operation
 */
const insertOneItem = async (params) => {
    try {

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new PutItemCommand({
            TableName: params.TableName,
            Item : params.Item
        }));
        console.log(metadata)

         requestId = metadata.$metadata.requestId;

        return requestId;

    } catch (error) {
        console.log(`Error in insertOneItem(), caused by ${{error}}`);
    }
}


module.exports = {
    insertOneItem
}