import { UserRepository, PasswordRepository } from '../repositories';
declare type Input = {
    userName: string;
    password: string;
};
export declare class SignInUserService {
    private userRepository;
    private passwordRepository;
    constructor(userRepository: UserRepository, passwordRepository: PasswordRepository);
    login(user: Input): Promise<boolean>;
}
export {};
