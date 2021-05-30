export declare class HashPasswordLocal {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
    private genSalt;
}
