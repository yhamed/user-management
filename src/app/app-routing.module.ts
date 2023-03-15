import { NgModule , inject} from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  Router
} from '@angular/router';
import {
  AuthenticationComponent
} from "./components/authentication/authentication.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {TokenStorageService} from "./services/token.storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ProfileComponent} from "./components/profile/profile.component";
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot) => {
      const tokenStorageService: TokenStorageService = inject(TokenStorageService);
      if(inject(JwtHelperService)?.isTokenExpired(tokenStorageService?.getToken())) {
        inject(Router)?.navigate(['login'], {state: {reset: true}});
        tokenStorageService.signOut();
        return false;
      }
      return true;
    }] },
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: AuthenticationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

