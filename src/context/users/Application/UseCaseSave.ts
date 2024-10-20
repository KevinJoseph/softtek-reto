import { User } from "../Domain/User";
import { UserRepository } from "../Infrastructure/repository/UserRepositoryImp";

export class UseCaseSave {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(user: User): Promise<User> {
    await this.userRepository.create(user);
    return user;
  }
}
