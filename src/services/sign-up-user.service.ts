import { injectable } from '../common';
import { UserRepository } from '../repositories';
import { UserAttributes } from '../local/models';

@injectable()
export class SignUpUserService {
  constructor(private userRepository: UserRepository) {}

  async signUp(input: UserAttributes): Promise<UserAttributes> {
    return await this.userRepository.create(input);
  }
}
