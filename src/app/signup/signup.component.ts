import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPasswordValidator } from '../services/confirm-password.validator';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showcontent =false;
  signUpForm: FormGroup;
  submitted: Boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passWordPattern= new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{5,50}$/);
  AgentType: any;
  agentTypeList: any;
  subAgentTypeList: any;

  constructor(
    private FB: FormBuilder,
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router
  ) { 
   this.createSignUpForm();
  }

  ngOnInit(): void {
    this.getAgentTypelist();
  }

  clickRadio1(){
    this.showcontent=false;
    this.signUpForm.removeControl('AgentType');
    this.signUpForm.removeControl('subAgentType');
  }
  clickRadio2(){
    this.showcontent=true;
    this.signUpForm.setControl('AgentType', this.FB.control('', [Validators.required]));
    this.signUpForm.setControl('subAgentType', this.FB.control('', [Validators.required]));  
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.signUpForm.controls[controlName].hasError(errorName);
  }

  createSignUpForm() {
    this.signUpForm = this.FB.group({
      UserType: ['1', [Validators.required]],
      // UserName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      FullName: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      Confirm_Password: ['', [Validators.required]],
      AgentType: ['',[Validators.required]],
      subAgentType: ['', Validators.required]
    },{
      validator: ConfirmPasswordValidator("Password", "Confirm_Password")
    }
    );
  }

  selectAgentType(e){
    this.AgentType = e;
    console.log("e===",e);
    this.sunAetAgentTypelist(e);
  }

  onPasswordValidation(e) {
    ConfirmPasswordValidator("Password", "Confirm_Password")
  }

  onCountryChange(obj) {
  }
  telInputObject(obj){
  }
  getWorkerNumber(obj) {
  }
  getNumber(obj) {
    console.log(obj);
    this.signUpForm.controls.Phone.setValue(obj);
  }

  doSignUp() {
    if(this.signUpForm.controls.UserType.value == '1') {
      this.signUpForm.removeControl('AgentType');
      this.signUpForm.removeControl('subAgentType');
    }
    if (this.signUpForm.invalid) return;
    console.log("this.signUpForm.value===",this.signUpForm.value);
    this.webService.createPost({ url: BaseUrl.apiUrl("registation"), body: this.signUpForm.value, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.toastr.success(res["message"],"Success")
        this.router.navigate(['/login']);
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  getAgentTypelist() {
    this.webService.createGet({ url: BaseUrl.apiUrl("agentTypeList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.agentTypeList = res["data"];
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  sunAetAgentTypelist(id) {
    this.webService.createGet({ url: BaseUrl.apiUrl("subAgentTypeList")+"?agentTypeId="+id, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.subAgentTypeList = res["data"];
        console.log("subAgentTypeList===", this.subAgentTypeList);
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

 

}
