import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showcontent =false;
  signInForm: FormGroup;
  submitted: Boolean = false;
  remberValue: Boolean = false;
  user: SocialUser;
  socialLogin: boolean = false;
  agentDetails: any;
  searchData: any;

  constructor(
    private fb: FormBuilder,
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService,
    private authService: SocialAuthService
  ) {
   this.createLoginForm();
   this.rememberMeGenerate();
   this.agentDetails = localStorage.getItem('agentDetails');
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if(user != null && this.socialLogin == false) {
        console.log("user===",this.user);
        let GoogleLoginObj = {
          FullName: user.name,
          Email: user.email,
          oauth_id: user.id,
          UserType: this.f.UserType.value
        }
        console.log("GoogleLoginObj==",GoogleLoginObj)
        this.doSocialLogin(GoogleLoginObj)
      }
    });
  }


  async doSocialLogin(GoogleLoginObj) {
    this.webService.createPost({ url: BaseUrl.apiUrl("sociaLogin"), body: GoogleLoginObj, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        let userData = res["data"];
        this.socialLogin = true;
        this.authService.signOut();
        this.webService.saveLocalData("userData", userData);
        this.webService.saveLocalData("token", res["token"]);
        this.webService.sendLoggedData(res["data"]);
        if(this.agentDetails != null) {
          let myUrl = JSON.parse(this.agentDetails);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "propertyId" : encodeURIComponent(myUrl)
            }
          }
          this.router.navigate(['/agent-details'],navigationExtras);
        } else {
          if(userData && userData.UserType == '1') {
            this.router.navigate(['/user/manage-account']);
          } else {
            this.router.navigate(['/users/manage-account']);
          }
          this.toastr.success("Welcome","Login Success");
        }
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }

    })
  }

  get f() {
    return this.signInForm.controls;
  }

  createLoginForm() {
    this.signInForm = this.fb.group({
      UserType: ['1', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  doLogin() {
    console.log("signInForm===",this.signInForm.value)
    this.submitted = true;
    if (this.signInForm.invalid) return;
    let e = { checked : true}
    this.rememberMe(e);
    this.webService.createPost({ url: BaseUrl.apiUrl("login"), body: this.signInForm.value, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        let userData = res["data"];
        this.webService.saveLocalData("userData", userData);
        this.webService.saveLocalData("token", res["token"]);
        this.webService.sendLoggedData(res["data"]);
        if(this.agentDetails != null) {
          let myUrl = JSON.parse(this.agentDetails);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "propertyId" : encodeURIComponent(myUrl)
            }
          }
          this.router.navigate(['/agent-details'],navigationExtras);
        } else {
          if(userData && userData.UserType == '1') {
            this.router.navigate(['/user/manage-account']);
          } else {
            this.router.navigate(['/users/manage-account']);
          }
          // this.toastr.success("Welcome","Login Success");
        }
        this.toastr.success("Welcome","Login Success");
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }

    })
  }

  rememberMe(e) {
    this.remberValue = e.checked;
    if(this.remberValue) {
      this.cookieService.set( 'UserType', this.f.UserType.value );
      this.cookieService.set( 'Password', this.f.Password.value );
      this.cookieService.set( 'Email', this.f.Email.value );
    } else {
      this.cookieService.delete('UserType');
      this.cookieService.delete('Password');
      this.cookieService.delete('Email');
    }
  }

  rememberMeGenerate() {
    let UserType = this.cookieService.get('UserType');
    let Email = this.cookieService.get('Email');
    let Password = this.cookieService.get('Password');
     if( Email && Password && UserType ) {
      this.f.UserType.setValue(UserType);
      this.f.Email.setValue(Email);
      this.f.Password.setValue(Password);
      this.remberValue = true;
     }

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }


}
