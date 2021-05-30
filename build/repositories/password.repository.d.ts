import { HashPasswordLocal } from '../local';
export declare class PasswordRepository {
    private hashPasswordLocal;
    constructor(hashPasswordLocal: HashPasswordLocal);
    compare(password: string, hash: string): Promise<boolean>;
}
