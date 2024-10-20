import { User } from "../Domain/User";
import { UserRepository } from "../Infrastructure/repository/UserRepositoryImp";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userId: string, name: string): Promise<User> {
    const user: User = { userId, name };
    await this.userRepository.create(user);
    return user;
  }
}
