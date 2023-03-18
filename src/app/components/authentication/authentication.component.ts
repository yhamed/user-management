import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token.storage.service";
import {ToastService} from "../../services/toast.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private toastService: ToastService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.toastService.info("Authentication", "Logged in as " + this.tokenStorage.getUser().username);
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.subscription = this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);

        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.toastService.error("Authentication", err.error.message);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
