import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from 'src/app/services/web.service';
import { BaseUrl } from 'src/app/services/base.service';
import { ConfirmPasswordValidator } from 'src/app/services/confirm-password.validator';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-my-account-customer',
  templateUrl: './my-account-customer.component.html',
  styleUrls: ['./my-account-customer.component.scss']
})
export class MyAccountCustomerComponent implements OnInit {
  editDetailsForm: FormGroup;
  submitted: Boolean = false;
  ownDetails: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passWordPattern= new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{5,50}$/);
  changePasswordForm : FormGroup;
  userData: any;
  someRegex: String = "/^(?:\(\d{4}\)|\d{3}-)\d{3}-\d{4}$/";
  profileImage: any;
  imageSrc: any;
  selectedTab = 0
  constructor(
    private FB: FormBuilder,
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if(this.userData != '' && this.userData != null) {
      if( this.userData.UserType == '1') {
        this.getOwnDetails();
        this.createChangePasswordForm();
      } else{
        this.router.navigate(["/home"]);
        this.toastr.info("Please login as a Customer")
      }
    } else {
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit(): void {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.editDetailsForm.controls[controlName].hasError(errorName);
  }

  handleAddressChange(address: Address) {
    this.editDetailsForm.controls.Address.setValue(address.formatted_address);
    // this.userPersonalInfo.Latitude = address.geometry.location.lat();
    // this.userPersonalInfo.Longitude = address.geometry.location.lng();
  }

  createEditDetailsFormForm(ownDetails) {
    this.editDetailsForm = this.FB.group({
      profile: [ownDetails && ownDetails.profile != '' && ownDetails.profile != undefined ? ownDetails.profile : "" ],
      Email: [ownDetails && ownDetails.Email != '' && ownDetails.Email != undefined ? ownDetails.Email : "" , [Validators.required, Validators.pattern(this.emailPattern)]],
      FullName: [ownDetails && ownDetails.FullName != '' && ownDetails.FullName != undefined ? ownDetails.FullName : "", [Validators.required]],
      Phone: [ownDetails && ownDetails.Phone != '' && ownDetails.Phone != undefined ? ownDetails.Phone : "", [Validators.required]],
      Address: [ownDetails && ownDetails.Address != '' && ownDetails.Address != undefined ? ownDetails.Address : "", [Validators.required]],
    });
  }

  public hasPasswordError = (controlName: string, errorName: string) =>{
    return this.changePasswordForm.controls[controlName].hasError(errorName);
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.FB.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.pattern(this.passWordPattern)]],
      confirmPassword: ["", [Validators.required]]
    },{
      validator: ConfirmPasswordValidator("newPassword", "confirmPassword")
    })
  }

  onCountryChange(obj) {
  }
  telInputObject(obj){
  }
  getWorkerNumber(obj) {
  }
  getNumber(obj) {
    this.editDetailsForm.controls.Phone.setValue(obj);
  }


  submitChangePasswrdForm() {
    if (this.changePasswordForm.invalid) return;
    this.webService.createPost({ url: BaseUrl.apiUrl("changePassword"), body: this.changePasswordForm.value, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.selectedTab = 0
        this.changePasswordForm.reset();

        this.toastr.success(res["message"],"Success");
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  getOwnDetails() {
    this.webService.createGet({ url: BaseUrl.apiUrl("ownDetails"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.ownDetails = res["data"];
        if(this.ownDetails.profile) {
          this.imageSrc = BaseUrl.baseUrl+ '/'+ this.ownDetails.profile;
        } else {
          this.imageSrc = 'assets/images/image-not-available.png';
        }
       this.createEditDetailsFormForm(this.ownDetails);
        // this.toastr.success("Welcome","Login Success");
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  submitOwnDetails() {
    if (this.editDetailsForm.invalid) return;
    let formData = new FormData();
    if(this.profileImage != '') {
      formData.append('profile', this.profileImage);
    }
    formData.append('Email', this.editDetailsForm.value.Email);
    formData.append('FullName', this.editDetailsForm.value.FullName);
    formData.append('Phone', this.editDetailsForm.value.Phone);
    formData.append('Address', this.editDetailsForm.value.Address);
    this.webService.createPostWithImage({ url: BaseUrl.apiUrl("editDetails"), body: formData, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.getOwnDetails();
        this.toastr.success(res["message"],"Success");
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  onSelectedProfileImage(event: File[]): void{
    if (event["target"].files.length > 0) {
      const file = event["target"].files[0];
      // this.userImageForm.get('profile').setValue(file);
      this.profileImage = file;
      console.log('this.profileImage->',this.profileImage)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imageSrc = reader.result;
         console.log("this.imageSrc==", this.imageSrc);

      }
    }
  }


}
