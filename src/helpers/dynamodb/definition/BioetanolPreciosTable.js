//External
const {
    CreateTableCommand
} = require("@aws-sdk/client-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("../config/dynamoDBClient");

/**
 * @description get all items from the database
 * @param {String} tableName string type
 * @param {BigInt} limit BigInt type
 * @param {String} orderAt String type
 * @returns a list with all items from the db in json format
 */
const createBioetanolPreciosTable = async () => {
    try {

        const tableDefinition = new CreateTableCommand({
            TableName: "EspressoDrinks",
            // For more information about data types,
            // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
            // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
            AttributeDefinitions: [
              {
                AttributeName: "DrinkName",
                AttributeType: "S",
              },
            ],
            KeySchema: [
              {
                AttributeName: "DrinkName",
                KeyType: "HASH",
              },
            ],
            ProvisionedThroughput: {
              ReadCapacityUnits: 1,
              WriteCapacityUnits: 1,
            },
          });

        dynamo = await dynamoDBClient();

        metadataTable = await dynamo.send(tableDefinition);

        console.log({'METADATA TABLE':metadataTable});

        // if(metadataTable != null){
        //     items = metadataTable.Items;
        // }
        
        return metadataTable;

    } catch (error) {
        console.log(`Error in createBioetanolPreciosTable(), caused by ${{error}}`);
        console.error(error.stack);
    }
}


module.exports = {
    createBioetanolPreciosTable
}