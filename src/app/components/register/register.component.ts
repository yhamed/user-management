import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private toastService: ToastService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    const {username, email, password} = this.form;

    this.subscription = this.authService.register(username, email, password).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toastService.info("SignUp", data.message);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.toastService.warning("SignUp", err.error.message);
      }
    });
  }
}
