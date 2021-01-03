import { User } from './user';
export class LoginResponse {
    access_token: string;
    name: string;
	token_type: string;
	payload: string[];
    expires_in: number;
    user: User;
}
