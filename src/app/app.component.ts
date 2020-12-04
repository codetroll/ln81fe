import { LogoutResponse } from './models/logoutresponse';
import { LoginResponse } from './models/loginresponse';
import { LoginRequest } from './models/loginrequest';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'ln81fe';
    subscriptions = [];
    loginResponse: LoginResponse | undefined;
    loginFormVisible: boolean = false;


    constructor(public authService: AuthService) { }

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
            console.log('isLoggedIn : ', this.authService.isLoggedIn());
            this.loginFormVisible = false;
        });
    }

    logout(): void {
        let loginRequest: LoginRequest;
        loginRequest = new LoginRequest();
        this.authService.logout().subscribe((data: LogoutResponse) => {
            console.log('logoutdata :', data);
            console.log('isLoggedIn : ', this.authService.isLoggedIn());
        });
    }

    get isAdmin(): boolean {
      return this.authService.getGroups().includes('admin');
    }

    ngOnInit(): void {

    }
}
