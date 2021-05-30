import { UserModel, UserAttributes } from '../models';
export declare class UserLocal {
    create(user: UserAttributes): Promise<UserModel>;
    getByUserName(userName: string): Promise<UserAttributes>;
}
