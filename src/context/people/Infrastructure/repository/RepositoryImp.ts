

import { People } from "../../Domain/People";
import { PeopleService } from "../services/PeopleService";

export class Repository {

    async findPeople(id: number): Promise<People | null> {

        try {
            const peopleService = new PeopleService();
            const find = await peopleService.getPeopleById(id);

            if (find) {
                const people: People = find as People;
                return people;
            } else {
                return null;
            }

        } catch (error) {
            console.error("Error finding people:", error);
            throw new Error("Could not find people");
        }
    }

}
