import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token.storage.service";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: any = {
    password: null,
    passwordConfirmation: null
  };

  currentUser: any;

  isChangingPassword: boolean = false;

  constructor(private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  onSubmit(): void {
  console.log("submit");
  console.log(this.form);
  }

  showPasswordForm(): void {
    this.isChangingPassword = !this.isChangingPassword;
  }
}
