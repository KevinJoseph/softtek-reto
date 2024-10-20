import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UseCaseFind } from "../../Application/UseCaseFind";

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const useCaseFind = new UseCaseFind();

    try {
        const { userId } = event.pathParameters || {};

        if (!userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "userId is required" }),
            };
        }

        const user = await useCaseFind.findUser(userId);
        if (user) {
            return {
                statusCode: 201,
                body: JSON.stringify(user),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "User not found" }),
            };
        }

    } catch (error) {
        console.error("Error in findUser handler:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
