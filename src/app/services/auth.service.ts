import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);
  constructor(
    private router: Router
  ) {
    this.ifLoggedIn();
  }


  ifLoggedIn() {
    let token = localStorage.getItem("token");
    if (token) {
      this.authState.next(true);
    }else{
      this.router.navigate(['/login']);
      this.authState.next(false);
    }
  }



  logout() {
    this.router.navigate(['/login']);
    this.authState.next(false);
    localStorage.clear();
  }

  isAuthenticated() {
    return this.authState.value;
  }


  getUserId() {
    let userDtls = JSON.parse(localStorage.getItem("userData"));
    return userDtls.userid;
  }


  tokenCheck() {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }


}
