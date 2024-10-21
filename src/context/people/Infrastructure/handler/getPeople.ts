import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UseCaseFind } from "../../Application/UseCaseFind";
import { translate } from '../../Commons/helpers/translate'
import { People, PeopleResponse } from "../../Domain/People";
import { peopleTranslation } from "../../Commons/i18n/peopleTranslation";

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
        
        const people: PeopleResponse = await useCaseFind.findPeople(idPeople);

        if (people) {
            const translatePeople = translate<People>(people, peopleTranslation);
            return {
                statusCode: 200,
                body: JSON.stringify(translatePeople),
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
