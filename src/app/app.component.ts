import { LoginResponse } from './models/loginresponse';
import { LoginRequest } from './models/loginrequest';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ln81fe';
    subscriptions = [];
    loginResponse: LoginResponse | undefined;

    constructor(private authService: AuthService) { }

    login(): void {
        let loginRequest: LoginRequest;
        loginRequest = new LoginRequest();
        loginRequest.email = 'claus.paludan@gmail.com';
        loginRequest.password = 'agressor';
        // this.subscriptions.push();
        // TODO Hvorfor genererer dette to kald i netværks fanen????
        this.authService.login(loginRequest).subscribe((data: LoginResponse) => {
            this.loginResponse = data;
            console.log(this.loginResponse);
        });

    }
}
