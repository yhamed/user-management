import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token.storage.service";
import {AppSettings} from "../app.component";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const USER_API = AppSettings.API_ENDPOINT + '/user/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updatePassword(id: number, username: string, password: string): Observable<any> {
    return this.http.patch(USER_API + 'password', {
      id,
      username,
      password
    }, httpOptions);
  }

  updateUserRoles(id: number, username: string, roles: string[]) {
    return this.http.put(USER_API + 'role', {
      id,
      username,
      roles
    }, httpOptions);
  }

  deleteUser(id: number) {
    return this.http.delete(USER_API + 'delete/' + id, httpOptions);
  }

  findAll(): Observable<any> {
    return this.http.get(USER_API + 'fetch', httpOptions);
  }
}
