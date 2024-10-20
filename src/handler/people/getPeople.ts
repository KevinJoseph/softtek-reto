import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { PeopleService } from "../../services/peopleService";

const peopleService = new PeopleService();

export const getPeopleById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({})
    }
    try {
        const id = event.pathParameters?.peopleId || '';

        if (id === '' || id === undefined) {
            response.statusCode = 400;
            response.body = JSON.stringify({
                error: 'Parameter id is needed please use ?id= at request URL',
            });
            return response;
        }

        const peopleId = parseInt(id, 10);

        if (isNaN(peopleId)) {
            response.statusCode = 400;
            response.body = JSON.stringify({
                error: 'Invalid planet ID, it must be a number',
            });
            return response;
        }


        const people = await peopleService.getPeopleById(peopleId);
        return {
            statusCode: 200,
            body: JSON.stringify(people),
          };
    } catch (error) {
        console.error(error)
    }

    return response;
}