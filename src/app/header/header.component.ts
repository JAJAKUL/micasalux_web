import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: any;
  userLogin: boolean = false;
  searchData: any;
  propertyCategoryList: any;
  propertyTypeList: any;

  constructor(
    private webService: WebService,
    private router: Router,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private authService: SocialAuthService
  ) {
    webService.getLoggedInData.subscribe((data) => {
      this.userData = data;
      this.userLogin = true;
      console.log("userData header===",data);
    });
  }

  ngOnInit(): void {
    this.checkLogin();
    this.getPropertyCategoryList();
    this.getPropertyTypeList();
    this.searchData = {
      longitude: 0,
      latitude: 0,
      property_category: '',
      property_type: '',
      room_number: '',
      bed_room_number: '',
      property_price: '',
      property_location: ''
      }
  }
  getAgentlist(data){
    console.log('data===================', data)
    this.router.navigate(['/property-agent-list', data]) .then(() => window.location.reload());;
  }
  getPropertyCategoryList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertyCategoryList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.propertyCategoryList = res["data"];
        console.log("propertyCategoryList===", this.propertyCategoryList);
        // this.toastr.success(res["message"],"Success");
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  getPropertyTypeList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertyTypeList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.propertyTypeList = res["data"];
        console.log("categoryList===", this.propertyTypeList);
        // this.toastr.success(res["message"],"Success");
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  checkLogin() {
    if (this.webService.getLocalData("token") && this.webService.getLocalData("userData")) {
      this.userLogin = true;
      this.userData = this.webService.getLocalData("userData");
      if(this.userData.expiry_date){
        var date = new Date()
        if(new Date(this.userData.expiry_date) < new Date())
        {
          alert("Your Subscription was expired, please renew subscription");
          return ;
        }
      }
      console.log("userData header local===",this.userData);
    } else {
      this.userLogin = false;
    }
  }

  logOut() {
    this.spinnerService.show();
    setTimeout(() => {
      // this.authService.signOut();
      this.webService.removeLocalData("userData");
      this.webService.removeLocalData("token");
      this.webService.sendLoggedoutData();
      this.userData = null;
      this.userLogin = false;
      this.spinnerService.hide();
      this.router.navigate(["/login"]);
    }, 1000);
  }

  newProjectList(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "property_category"   : encodeURIComponent(this.searchData.property_category),
        "new_project_type" : encodeURIComponent(data),
        "property_type"   : encodeURIComponent(this.searchData.property_type),
        "longitude"   : encodeURIComponent(this.searchData.longitude),
        "latitude"   : encodeURIComponent(this.searchData.latitude),
        "property_location" : encodeURIComponent(this.searchData.property_location),
        "room_number"   : encodeURIComponent(this.searchData.room_number),
        "bed_room_number"   : encodeURIComponent(this.searchData.bed_room_number),
        "property_price"   : encodeURIComponent(this.searchData.property_price)
      }
    }
    this.router.navigate(["/properties"], navigationExtras);
  }

  saleAndRentPropertyList(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "property_category"   : encodeURIComponent(data),
        "property_type"   : encodeURIComponent(this.searchData.property_type),
        "longitude"   : encodeURIComponent(this.searchData.longitude),
        "latitude"   : encodeURIComponent(this.searchData.latitude),
        "property_location" : encodeURIComponent(this.searchData.property_location),
        "room_number"   : encodeURIComponent(this.searchData.room_number),
        "bed_room_number"   : encodeURIComponent(this.searchData.bed_room_number),
        "property_price"   : encodeURIComponent(this.searchData.property_price)
      }
    }
    this.router.navigate(["/properties"], navigationExtras);
  }

}
