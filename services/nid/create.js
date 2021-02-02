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
            userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
            nid: uuidv4(), // A unique uuid
            added: Date.now(),
            type: data.type,
            retrieve_method: "ManualSubmit",
            source: data.editorID,
            article_url: data.sourceURL,
            article_domain: data.sourceDomain,
            authors: data.authors,
            categories_submitted: data.categories,
            keywords_submitted: data.keywords,
            stocks: data.stocks,
            picture: data.imageURL,
            title: data.title,
            cta: data.cta,
            summary: data.summary,
            html_content: data.html
        },
    };
    await dynamoDb.put(params);
    return params.Item;
});
