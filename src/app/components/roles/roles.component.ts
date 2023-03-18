import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {

  @Output() roleEvent = new EventEmitter();
  suspend() {
    this.roleEvent.emit([]);
  }
  grantUserRole() {
    this.roleEvent.emit(["ROLE_USER"]);
  }


  grantAdminRole() {
    this.roleEvent.emit(["ROLE_USER", "ROLE_ADMIN"]);
  }
}
