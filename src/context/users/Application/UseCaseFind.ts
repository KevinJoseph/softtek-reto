import { User } from "../Domain/User";
import { UserRepository } from "../Infrastructure/repository/UserRepositoryImp";

export class UseCaseFind {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findUser(document: String): Promise<User | null> {
    let result = await this.userRepository.find(document);
    return result;
  }
}
