import axios from 'axios';
import { People } from '../../Domain/People';

export class PeopleService{
    
  async getPeopleById(id: number): Promise<People> {
    const { data } = await axios.get(`https://swapi.py4e.com/api/people/${id}/`);

    if (data.detail) {
      throw new Error(
        `Unable to find people with id: ${id}, with details from api: ${data.detail}`,
      );
    }

    const people: People = {
      name: data.name,
    };

    return people;
  }
}