import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ToastService} from "../../services/toast.service";
import {SubscriptionContainer} from "../../domain/subscriptionContainer";

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService, private toastService: ToastService, private ref: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.subscriptions.dispose();
  }

  private subscriptions: SubscriptionContainer = new SubscriptionContainer();

  form: any = {
    id: null,
    username: null,
    password: null,
  };
  userData: any;

  userToUpdate: any;

  editRoles: boolean = false;

  ngOnInit() {
    this.userService.findAll().subscribe(data => this.userData = data);
  }

  loadUsers() {
    this.cancel();
    this.subscriptions.add = this.userService.findAll().subscribe(data => this.userData = data);
    this.ref.detectChanges()
  }

  editUser(user: any) {
    if (!this.editRoles) {
      this.form.id = user.id;
      this.form.username = user.username;
      this.form.email = user.email;
      this.form.roles = user?.roles.map((role: any) => role.name);
    }
  }

  cancel() {
    this.form = {
      id: null,
      username: null,
      email: null,
      password: null,
      roles: null
    };

    this.userToUpdate = null;
  }

  editRole(user: any) {
    this.userToUpdate = user;
    this.editRoles = true;
  }

  applyRoles(roles: any[]) {
    this.editRoles = false;
    let username = this.userToUpdate?.username;

    let id: number = +this.userToUpdate?.id;
    this.subscriptions.add = this.userService.updateUserRoles(id, this?.userToUpdate?.username, roles).subscribe({
      next: (response: any) => {
        this.toastService.show("Role change: " + username, response.message);
        console.log(response);
        this.userToUpdate = null;
        this.loadUsers();
      },
      error: err => {
        this.toastService.error("Role change: " + username, err.error.message);
      }
    });

    this.loadUsers();
  }

  deleteUser(id: string, username: string) {
    this.subscriptions.add = this.userService.deleteUser(+id).subscribe({
      next: (response: any) => {
        this.toastService.warning("Delete user: " + username, response.message);
        this.userToUpdate = null;
        this.loadUsers();
      },
      error: err => {
        this.toastService.error("Delete user: " + username, err.error.message);
      }
    });
  }

  submitPasswordChange(event: any) {
    let id: number = +event?.id;

    this.subscriptions.add = this.userService.updatePassword(id, event?.username, event?.password).subscribe({
      next: (data: any) => {
        this.toastService.success("Password change: " + event?.username, data.message);
      },
      error: err => {
        this.toastService.error("Password change", err.error.message);
      }
    });
    this.loadUsers();
  }
}
