import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UseCaseSave } from "../../Application/UseCaseSave";
import { User } from "../../Domain/User";

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const useCaseSave = new UseCaseSave();

  try {
    const { userId, name } = JSON.parse(event.body || '{}');

    if (typeof userId !== "string" || typeof name !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '"userId" and "nombre" must be strings' }),
      };
    }

    const user: User = {
      userId,
      name
    };

    const createdUser = await useCaseSave.createUser(user);

    return {
      statusCode: 201,
      body: JSON.stringify(createdUser),
    };
    
  } catch (error) {
    console.error("Error in createUser handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
