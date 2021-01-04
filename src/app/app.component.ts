import { ViewComponent } from './components/view/view.component';
import { User } from './models/user';
import { SessionService } from './services/session.service';
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
export class AppComponent extends ViewComponent implements OnInit {

    title = 'ln81fe';
    loginResponse: LoginResponse | undefined;
    loginFormVisible = false;
    loginForm: FormGroup;
    user: User = new User();

    constructor(public authService: AuthService, private formBuilder: FormBuilder, public sessionService: SessionService) {
        super();
    }

    ngOnInit(): void {
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
        this.subscriptions(this.authService.login(loginRequest).subscribe((data: LoginResponse) => {
            this.loginResponse = data;
            this.user.name = this.sessionService.getUserName();
            // console.log(this.loginResponse);
            // console.log('isLoggedIn : ', this.authService.isLoggedIn());
            this.loginFormVisible = false;
        }));
    }

    logout(): void {
        this.subscriptions(this.authService.logout().subscribe((data: LogoutResponse) => {
            console.log('logoutdata :', data);
            console.log('isLoggedIn : ', this.authService.isLoggedIn());
        }));
    }

    get isAdmin(): boolean {
        console.log('isAdmin : ', this.sessionService.isAdmin);
        return this.sessionService.isAdmin;
    }

}
