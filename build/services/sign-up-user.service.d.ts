import { UserRepository } from '../repositories';
import { UserAttributes } from '../local/models';
export declare class SignUpUserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    signUp(input: UserAttributes): Promise<UserAttributes>;
}
