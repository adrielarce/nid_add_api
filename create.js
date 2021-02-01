import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

const { v4: uuidv4 } = require('uuid');

export const main = handler(async (event, context) => {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            // The attributes of the item to be created
            nid: uuidv4(), // A unique uuid
            added: Date.now(),
            type: data.type,
        },
    };
    await dynamoDb.put(params);
    return params.Item;
});
