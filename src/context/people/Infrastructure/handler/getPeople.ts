import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UseCaseFind } from "../../Application/UseCaseFind";

export const getPeopleById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const useCaseFind = new UseCaseFind();

    try {
        const { id } = event.pathParameters || {};

        if (!id || isNaN(Number(id))) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "id is required and must be a number" }),
            };
        }

        const idPeople = Number(id);
        
        const people = await useCaseFind.findPeople(idPeople);
        if (people) {
            return {
                statusCode: 200,
                body: JSON.stringify(people),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "People not found" }),
            };
        }

    } catch (error) {
        console.error("Error in findPeople handler:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
