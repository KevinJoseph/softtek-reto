import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserService } from "../../Application/useCaseSave";

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userService = new UserService();

  try {
    const { userId, name } = JSON.parse(event.body || '{}');

    if (typeof userId !== "string" || typeof name !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '"userId" and "name" must be strings' }),
      };
    }

    const user = await userService.createUser(userId, name);
    return {
      statusCode: 201,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error("Error in createUser handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
