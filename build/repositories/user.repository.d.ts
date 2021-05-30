import { UserLocal, HashPasswordLocal } from '../local';
import { UserAttributes } from '../local/models';
export declare class UserRepository {
    private userLocal;
    private hashPasswordLocal;
    constructor(userLocal: UserLocal, hashPasswordLocal: HashPasswordLocal);
    create(user: UserAttributes): Promise<UserAttributes>;
    getByUserName(userName: string): Promise<UserAttributes>;
}
