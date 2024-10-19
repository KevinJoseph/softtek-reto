// handler/getUser.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = process.env.USERS_TABLE;

module.exports.getUser = async (event) => {
  const { userId } = event.pathParameters;

  const params = {
    TableName: USERS_TABLE,
    Key: { userId },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    
    if (Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not retrieve user" }),
    };
  }
};
