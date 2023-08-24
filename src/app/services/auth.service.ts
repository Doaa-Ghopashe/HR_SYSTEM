import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoginSubject = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient, private _router: Router) {
    this.checkLoginStatus()
  }


  checkLoginStatus() {
    let token = localStorage.getItem("token");
    if (token) {
      this.isLoginSubject.next(true);
    }
    else {
      this.isLoginSubject.next(false);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
  setLoggedIn(data:any) {
    this.isLoginSubject.next(data)
 }
  canActivate(): boolean | Observable<boolean> {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    this._router.navigateByUrl("/user/login")
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
    this._router.navigateByUrl('/login');
  }

  login(loginData: any): Observable<any> {
    return this._http.post('http://localhost:5000/login', loginData);
  }
}
