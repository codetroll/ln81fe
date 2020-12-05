import { LogoutResponse } from './models/logoutresponse';
import { LoginResponse } from './models/loginresponse';
import { LoginRequest } from './models/loginrequest';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    loginForm: FormGroup;

    constructor(public authService: AuthService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.loginForm = this.formBuilder.group({
            email: new FormControl(null),
            password: new FormControl(null)
        });
        
    }

    login(): void {
        let loginRequest: LoginRequest;
        loginRequest = new LoginRequest();

        loginRequest.email = this.loginForm.controls.email.value;
        loginRequest.password = this.loginForm.controls.password.value;
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

}
