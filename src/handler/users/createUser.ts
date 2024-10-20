import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = process.env.USERS_TABLE!; // Asegurando que USERS_TABLE está definida

interface User {
  userId: string;
  name: string;
}

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { userId, name } = JSON.parse(event.body || '{}');

    if (typeof userId !== "string" || typeof name !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '"userId" and "name" must be strings' }),
      };
    }

    const params = {
      TableName: USERS_TABLE,
      Item: { userId, name },
    };

    try {
      const command = new PutCommand(params);
      await docClient.send(command);

      return {
        statusCode: 201,
        body: JSON.stringify({ userId, name }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Could not create user" }),
      };
    }

  } catch (error) {
    console.error("Error parsing event body", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }
};
