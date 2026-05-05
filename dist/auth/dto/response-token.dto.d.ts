export declare class ResponseTokenDto {
    access_token: string;
    token_type: string;
    expires_in: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}
