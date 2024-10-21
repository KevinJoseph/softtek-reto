import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UseCaseSave } from "../../Application/UseCaseSave";
import { User } from "../../Domain/User";

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const useCaseSave = new UseCaseSave();

  try {
    const { document, phone } = JSON.parse(event.body || '{}');

    if (typeof document !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '"document" and "nombre" must be strings' }),
      };
    }

    const user: User = {
      document,
      phone,

    };

    const createdUser = await useCaseSave.create(user);

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
