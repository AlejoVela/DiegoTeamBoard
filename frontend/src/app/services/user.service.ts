import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  env: string;

  constructor(private _http: HttpClient, private _router: Router) { 
    this.env = environment.APP_URL;
  }

  registerUser( user: any ){
    return this._http.post<any>( this.env + 'user/createUser', user);
  }

  listUser( user?: any ) {
    return this._http.get<any>( this.env + 'user/listUser/'+ user?.name);
  }

  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login'])
  }
}
