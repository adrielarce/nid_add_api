import CognitoStack from "./CognitoStack";
import DynamoDBStack from "./DynamoDBStack";
// Add stacks
export default function main(app) {
  new DynamoDBStack(app, "dynamodb");
  new CognitoStack(app, "cognito");
}
