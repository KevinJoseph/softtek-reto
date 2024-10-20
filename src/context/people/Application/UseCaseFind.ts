import { People } from "../Domain/People";
import { Repository } from "../Infrastructure/repository/RepositoryImp";

export class UseCaseFind {
  private repository: Repository;

  constructor() {
    this.repository = new Repository();
  }

  async findPeople(id: number): Promise<People | null> {
    const people = await this.repository.findPeople(id);
    return people;
  }
}
