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

  constructor(private authService: AuthService) {}

  login() {
      let loginRequest: LoginRequest;
      loginRequest = new LoginRequest();
      loginRequest.email = 'claus.paludan@gmail.com';
      loginRequest.password = 'agressor';
      this.authService.login(loginRequest);
  }
}
