//External
const {
    ScanCommand
} = require("@aws-sdk/lib-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("../config/dynamoDBClient");
//Const-vars 
let dynamo;
let metadata;
let items;


/**
 * @description get all items from the database
 * @param {String} tableName string type
 * @param {BigInt} limit BigInt type
 * @param {String} orderAt String type
 * @returns a list with all items from the db in json format
 */
const getAllItems = async (tableName, pageSizeNro, orderAt) => {
    try {
        items=null;
        orderAt = orderAt.toLowerCase();

        if(orderAt=='asc' || orderAt == null){
            orderAt=true;
        }else{
            orderAt=false;
        }

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(
            new ScanCommand({
                TableName: tableName,
                Limit: pageSizeNro,
                ScanIndexForward : orderAt
            })
        );

        if(metadata != null){
            items = metadata.Items;
        }
        
        return items;

    } catch (error) {
        console.log(`Error in getAllItems(), caused by ${{error}}`);
        console.error(error.stack);
    }
}


module.exports = {
    getAllItems
}
