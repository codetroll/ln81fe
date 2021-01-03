import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { ReglerComponent } from './regler/regler.component';
import { KarakterComponent } from './karakter/karakter.component';
import { RollerComponent } from './roller/roller.component';
import { GrejComponent } from './grej/grej.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ReglerComponent,
        KarakterComponent,
        RollerComponent,
        GrejComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        CookieService,
        HttpClient,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
