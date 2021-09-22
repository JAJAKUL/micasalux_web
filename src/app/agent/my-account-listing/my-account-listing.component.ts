import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPasswordValidator } from 'src/app/services/confirm-password.validator';
import { WebService } from 'src/app/services/web.service';
import { BaseUrl } from 'src/app/services/base.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from 'src/app/shared/add-property/add-property.component';
// import { $ } from 'protractor';
declare var $:any;


@Component({
  selector: 'app-my-account-listing',
  templateUrl: './my-account-listing.component.html',
  styleUrls: ['./my-account-listing.component.scss']
})
export class MyAccountListingComponent implements OnInit {
  editDetailsForm: FormGroup;
  submitted: Boolean = false;
  ownDetails: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passWordPattern= new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{5,50}$/);
  changePasswordForm : FormGroup;
  userData: any;
  cardDetails: any;
  cardDetailsForm: any;
  showCardDetails: boolean = false;
  propertyList: any;
  agentTypeList: any;
  subAgentTypeList: any;
  profileImage: any;
  imageSrc: any;
  subscriptionList: any;
  userSubscription
  constructor(
    private FB: FormBuilder,
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog,
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if(this.userData != '' && this.userData != null) {
      if( this.userData.UserType == '2') {
        this.getOwnDetails();
        this.getAgentTypelist();
        this.getUsersubscriptionList()
        this.createChangePasswordForm();
        // this.getPropertylist();
        this.getCardDetails();
        this.getSubscriptionlist()
      } else{
        this.router.navigate(["/home"]);
        this.toastr.info("Please login as a Property Agent")
      }
    } else {
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit(): void {
    // if(confirm("Are you sure to delete ")) {
    //   console.log("Implement delete functionality here");
    // }else{
    //   console.log("Implement delete functionality here false");

    // }

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.editDetailsForm.controls[controlName].hasError(errorName);
  }

  submitOwnDetails() {
    this.submitted = true;
    if (this.editDetailsForm.invalid) return;
    let formData = new FormData();
    if(this.profileImage != '') {
      formData.append('profile', this.profileImage);
    }
    formData.append('Email', this.editDetailsForm.value.Email);
    formData.append('FullName', this.editDetailsForm.value.FullName);
    formData.append('Phone', this.editDetailsForm.value.Phone);
    formData.append('Address', this.editDetailsForm.value.Address);
    formData.append('AgentType', this.editDetailsForm.value.AgentType);
    formData.append('subAgentType', this.editDetailsForm.value.subAgentType);
    formData.append('description', this.editDetailsForm.value.description)

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

  createEditDetailsFormForm(ownDetails) {
    this.editDetailsForm = this.FB.group({
      Email: [ownDetails && ownDetails.Email != '' && ownDetails.Email != undefined ? ownDetails.Email : "" , [Validators.required, Validators.pattern(this.emailPattern)]],
      FullName: [ownDetails && ownDetails.FullName != '' && ownDetails.FullName != undefined ? ownDetails.FullName : "", [Validators.required]],
      Phone: [ownDetails && ownDetails.Phone != '' && ownDetails.Phone != undefined ? ownDetails.Phone : "", [Validators.required]],
      Address: [ownDetails && ownDetails.Address != '' && ownDetails.Address != undefined ? ownDetails.Address : "", [Validators.required]],
      AgentType: [ownDetails && ownDetails.AgentType != '' && ownDetails.AgentType != undefined ? ownDetails.AgentType : "", Validators.required],
      subAgentType: [ownDetails && ownDetails.subAgentType != '' && ownDetails.subAgentType != undefined ? ownDetails.subAgentType : "", Validators.required],
      description:[ownDetails && ownDetails.description != '' && ownDetails.description != undefined ? ownDetails.description : ""]
    });
  }

  public hasPasswordError = (controlName: string, errorName: string) =>{
    return this.changePasswordForm.controls[controlName].hasError(errorName);
  }

  handleAddressChange(address: Address) {
    this.editDetailsForm.controls.Address.setValue(address.formatted_address);
    // this.userPersonalInfo.Latitude = address.geometry.location.lat();
    // this.userPersonalInfo.Longitude = address.geometry.location.lng();
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.FB.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.pattern(this.passWordPattern)]],
      confirmPassword: ["", Validators.required]
    },{
      validator: ConfirmPasswordValidator("newPassword", "confirmPassword")
    })
  }

  submitChangePasswrdForm() {
    if (this.changePasswordForm.invalid) return;
    this.webService.createPost({ url: BaseUrl.apiUrl("changePassword"), body: this.changePasswordForm.value, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
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
       this.sunAetAgentTypelist(this.ownDetails.AgentType);
        // this.toastr.success("Welcome","Login Success");
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  getPropertylist() {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertylist"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.propertyList = res["data"];
        console.log("this.propertyList1===",this.propertyList);
        this.propertyList.forEach(element => {
          if(element.property_image) {
            element.property_image = BaseUrl.baseUrl+'/'+element.property_image[0].url;
          } else{
            element.property_image = 'assets/images/property-img-1.png'
          }
        });
        console.log("this.propertyList===",this.propertyList);
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  getSubscriptionlist() {
    this.webService.createGet({ url: BaseUrl.apiUrl("GetSubscriptionList"), contentType: true, loading: true }).then(res => {
      console.log('res===================', res)
      if (res["status"]) {
        this.subscriptionList = res["data"];
        this.subscriptionList.forEach(element => {
          if(element._id == this.userSubscription.subscriptionId) {
            element.buttonDisabled = true;
          } else{
            element.buttonDisabled = false;
          }
        });

        console.log("this.subscriptionList===",this.subscriptionList);
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }
  getUsersubscriptionList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("UserSubscriptionList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.userSubscription = res["data"];

        console.log("userSubscription===", this.userSubscription);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }
  BuySubscription(data) {
    console.log(data)
    var date = new Date()
    var expiry_date = addDays(date, data.no_of_days)
    var obj ={
      expiry_date: expiry_date,
      subscriptionId: data._id,
      no_image: data.no_image,
      no_video: data.no_video,
      price: data.price,
      duration: data.duration,
      no_of_days:data.no_of_days,
      no_properties:data.no_properties,
      description:data.description,
      subscriptionType: data.duration
    }
    console.log('obj==============', obj)
    this.webService.createPost({ url: BaseUrl.apiUrl("addUser_subscription"), body: obj, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        $("#subscriptionModal").modal("hide");
        if(this.webService.getLocalData("userData")){
          this.userData = this.webService.getLocalData("userData");
          this.userData.expiry_date = res["data"].expiry_date
          this.webService.saveLocalData("userData", this.userData);
        }
        // $('#subscriptionModal').modal('hide')  this.webService.saveLocalData("userData", userData);
        console.log(res["status"])
        this.toastr.success(res["message"],"Success");
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }


  createCardDetailsForm() {
    this.cardDetailsForm = this.FB.group({
      NameOnCard: [this.cardDetails && this.cardDetails.NameOnCard != "" ? this.cardDetails.NameOnCard : "", Validators.required],
      CardNumber: [this.cardDetails && this.cardDetails.CardNumber != "" ? this.cardDetails.CardNumber : "", Validators.required],
      ExpDate: [this.cardDetails && this.cardDetails.ExpDate != "" ? this.cardDetails.ExpDate : "", Validators.required],
      CVV: [this.cardDetails && this.cardDetails.CVV != "" ? this.cardDetails.CVV : "", Validators.required]
    })
  }

  public hasCardError = (controlName: string, errorName: string) =>{
    return this.cardDetailsForm.controls[controlName].hasError(errorName);
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

  getCardDetails() {
    this.webService.createGet({ url: BaseUrl.apiUrl("getCardDetails"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.cardDetails = res["data"];
        this.showCardDetails = true;
        this.createCardDetailsForm();
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  SubmitCardDetailsForm() {
    this.submitted = true;
    if (this.cardDetailsForm.invalid) return;
    this.webService.createPost({ url: BaseUrl.apiUrl("addCardDetails"), body: this.cardDetailsForm.value, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.toastr.success(res["message"],"Success");
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }


  addProperty() {
    console.log("addProperty click work.");
    const dialogRef = this._dialog.open(AddPropertyComponent, {
      width: '500px',
      panelClass: 'AddPropertyComponent',
      data: {},
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //let found = false;
      if (result && result.result === true) {
          this.getPropertylist();
      }
  });
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

  selectAgentType(e){
    this.sunAetAgentTypelist(e);
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
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
