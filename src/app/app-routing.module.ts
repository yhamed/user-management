import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthenticationComponent
} from "./components/authentication/authentication.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
