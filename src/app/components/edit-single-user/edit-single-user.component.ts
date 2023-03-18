import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-edit-single-user',
  templateUrl: './edit-single-user.component.html',
  styleUrls: ['./edit-single-user.component.css']
})
export class EditSingleUserComponent {
  @Input() form: any = {
    id: null,
    username: null,
    email: null,
    password: null,
    roles: null
  };

  @Output() cancelEvent = new EventEmitter();

  @Output() submitUser = new EventEmitter();
  errorMessage = '';

  constructor(private toastService: ToastService) { }
  onSubmit(): void {
    this.submitUser.emit(this.form);
  }

  cancel() {
    this.cancelEvent.emit();
  }
}
