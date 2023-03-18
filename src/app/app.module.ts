import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import {RegisterComponent} from "./components/register/register.component";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {ProfileComponent} from "./components/profile/profile.component";
import {authInterceptorProviders} from "./_helpers/auth.interceptor";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { EditSingleUserComponent } from './components/edit-single-user/edit-single-user.component';
import { RolesComponent } from './components/roles/roles.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';

@NgModule({
  declarations: [
    ProfileComponent,
    RegisterComponent,
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    AdminBoardComponent,
    EditSingleUserComponent,
    RolesComponent
  ],
  imports: [
    MdbCheckboxModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [   { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

