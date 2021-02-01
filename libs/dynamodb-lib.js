import AWS from "aws-sdk";
const client = new AWS.DynamoDB.DocumentClient();

export default {
    put: (params) => client.put(params).promise(),
};
