declare type CreateUserDto = {
    body: {
        name: string;
        lastName: string;
        password: string;
        userName: string;
        preferredCurrency: number;
    };
};
declare type GetUserDto = {
    body: {
        userName: string;
        password: string;
    };
};
export declare function getUser(req: GetUserDto, res: any): Promise<any>;
export declare function createUser(req: CreateUserDto, res: any): Promise<any>;
export {};
