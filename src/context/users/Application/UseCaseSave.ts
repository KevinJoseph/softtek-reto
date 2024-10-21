import { User } from "../Domain/User";
import { UserRepository } from "../Infrastructure/repository/UserRepositoryImp";

export class UseCaseSave {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(user: User): Promise<User> {
    await this.userRepository.create(user);
    return user;
  }
}
