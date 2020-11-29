export class LoginResponse {
	access_token!: string;
	token_type!: string;
	payload!: string[];
    expires_in!: number;
}
