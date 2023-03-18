import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token.storage.service";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ToastService} from "../../services/toast.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  form: any = {
    password: null
  };

  currentUser: any;

  isChangingPassword: boolean = false;
  isSuccessful = false;
  isPasswordChangeFailure = false;
  responseMessage = '';

  subscription: Subscription = new Subscription();

  constructor(private token: TokenStorageService, private userService: UserService, private toastService: ToastService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  onSubmit(): void {
    this.subscription = this.userService.updatePassword(this.currentUser.id, this.currentUser.username, this.form.password)
      .subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isPasswordChangeFailure = false;
          this.responseMessage = data.message;
          this.isChangingPassword = false;
          this.toastService.success("Credentials", data.message);
        },
        error: err => {
          this.responseMessage = err.error.message;
          this.isSuccessful = false;
          this.isPasswordChangeFailure = true;
          this.toastService.error("Credentials", err.error.message);
        }
      });
  }

  showPasswordForm(): void {
    this.isChangingPassword = true;
  }
}
