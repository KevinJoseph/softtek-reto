import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = process.env.USERS_TABLE!; // ! indica que asegura q no es undefined

interface User {
  userId: string;
  name: string;
}

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { userId } = event.pathParameters || {};

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "User ID is required" }),
    };
  }

  const params = {
    TableName: USERS_TABLE,
    Key: { userId },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);

    if (Item) {
      const user: User = Item as User; 
      return {
        statusCode: 200,
        body: JSON.stringify(user),
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
