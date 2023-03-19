import { NgModule , inject} from '@angular/core';
import {
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
import {ToastService} from "./services/toast.service";
import {AdminBoardComponent} from "./components/admin-board/admin-board.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: isConnectedUserGuard() },
  { path: 'profile', component: ProfileComponent, canActivate: isConnectedUserGuard() },
  { path: 'admin', component: AdminBoardComponent, canActivate: isAdminGuard()},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: AuthenticationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

function isConnectedUserGuard() {
  return [(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const toast: ToastService = inject(ToastService);
    const router: Router = inject(Router);
    const tokenStorageService: TokenStorageService = inject(TokenStorageService);
    if (tokenStorageService?.getToken() === null) {
      toast.warning("Authentication","You have been logged out.");
      router.navigate(['./login'], {state: {reset: true}});
      return false;
    }
    if (inject(JwtHelperService)?.isTokenExpired(tokenStorageService?.getToken())) {
      router.navigate(['./login'], {state: {reset: true}});
      tokenStorageService.signOut();
      toast.warning("Session has expired","Please proceed to login.");
      return false;
    }
    return true;
  }];
}

function isAdminGuard() {
  return [(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const toast: ToastService = inject(ToastService);
    const tokenStorageService: TokenStorageService = inject(TokenStorageService);
    const router: Router = inject(Router);
    if (inject(JwtHelperService)?.isTokenExpired(tokenStorageService?.getToken())) {
      router?.navigate(['./login'], {state: {reset: true}});
      tokenStorageService.signOut();
      toast.warning("Session has expired","Please proceed to login.");
      return false;
    }
    if (tokenStorageService.getUser()?.roles.some((role: string) => role === 'ROLE_ADMIN')) {
      return true;
    }

    toast.error("Unauthorized","You don't have the authority to access this resource");
    router?.navigate(['./home'], {state: {reset: true}});
    return false;
  }];
}

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

