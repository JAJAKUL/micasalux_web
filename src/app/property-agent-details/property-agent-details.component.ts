import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-property-agent-details',
  templateUrl: './property-agent-details.component.html',
  styleUrls: ['./property-agent-details.component.scss']
})
export class PropertyAgentDetailsComponent implements OnInit {
  searchData: any;
  propertyCategoryList: any;
  propertyList: any;
  searchLocation: any;
  wishPropertyList: any;
  userLoginStatus: boolean = false;
  userData: any;
  userAgetData: any;

  constructor(
    private router: Router,
    private activeRoute : ActivatedRoute,
    private webService: WebService,
    private toastr: ToastrService
    ) {
      this.searchData = {
        longitude: decodeURIComponent(this.activeRoute.snapshot.queryParams['longitude']),
        latitude: decodeURIComponent(this.activeRoute.snapshot.queryParams['latitude']),
        property_type: decodeURIComponent(this.activeRoute.snapshot.queryParams['property_type']),
        room_number: decodeURIComponent(this.activeRoute.snapshot.queryParams['room_number']),
        bed_room_number: decodeURIComponent(this.activeRoute.snapshot.queryParams['bed_room_number']),
        property_price: decodeURIComponent(this.activeRoute.snapshot.queryParams['property_price']),
        property_location: decodeURIComponent(this.activeRoute.snapshot.queryParams['property_location']),
        property_category: decodeURIComponent(this.activeRoute.snapshot.queryParams['property_category']),
      }
      this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.params.id);

   this.searchData = this.activeRoute.snapshot.params.id;
   if(this.searchData){
    this.getPropertyList();

   }

    // this.activeRoute.queryParams.subscribe(queryParams => {
    //   this.searchLocation = queryParams.property_location;
    //   console.log("queryParams===",queryParams)
    //   this.searchData = queryParams;
    //   this.getPropertyList();
    // });

    // this.getPropertyCategoryList();
    // this.getPropertyList();

  }

 gotoPropertyDetails(propertyId){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "propertyId" : encodeURIComponent(propertyId)
    }
  }
  this.router.navigate(['/property-details'],navigationExtras);
 }

 getPropertyCategoryList() {
  this.webService.createGet({ url: BaseUrl.apiUrl("propertyCategoryList"), contentType: true, loading: true }).then(res => {
    if (res["status"]) {
      this.propertyCategoryList = res["data"];
      console.log("propertyCategoryList===", this.propertyCategoryList);
    }else{
      this.toastr.error(res["message"],"Error")
    }
  })
}

 getPropertyList() {
   console.log("this.searchData===",this.searchData)

     this.userLoginStatus = true;
   var obj = {
     user_id : this.searchData
   }

     this.webService.createPost({ url: BaseUrl.apiUrl("getAgentAndPropertyList"), body:obj, contentType: true, loading: true }).then(res => {
      console.log('res==============', res)

      if (res["status"]) {
        this.propertyList = res["data"];
        this.userAgetData = res["userData"];
        if(this.userAgetData.profile) {
          this.userAgetData.profile = BaseUrl.baseUrl+'/'+this.userAgetData.profile
        }

        this.propertyList.forEach(element => {
          if(element.property_image) {
            element.property_image = BaseUrl.baseUrl+'/'+element.property_image[0].url
          } else{
            element.property_image = 'assets/images/image-not-available.png'
          }
        });
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })

 }

 handleAddressChange(address: Address) {
   console.log("this.searchData.property_location===",this.searchData.property_location);
  this.searchData.property_location = address.formatted_address;
  console.log("this.searchData.property_location2===",this.searchData.property_location);
  this.searchData.latitude = address.geometry.location.lat();
  this.searchData.longitude = address.geometry.location.lng();
}

wishBtnClick(id,i) {
  if(this.userData == false) {
    this.toastr.error("Please Login Your Account","Error")
    return;
  } else {
    this.webService.createGet({ url: BaseUrl.apiUrl("addInWishProperty")+"?propertyId="+id, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        console.log("res['data']==",res['data'])
          this.propertyList[i].wishProperty = res['data']._id;
          console.log("propertyCategoryList===", this.propertyList);
        this.toastr.success(res["message"],"Success")
      }else{
        this.toastr.error(res["message"],"Error")
      }
    });
  }
}

removeWishBtnClick(id,i) {
  this.webService.createGet({ url: BaseUrl.apiUrl("removewishproperty")+"?propertyId="+id, contentType: true, loading: true }).then(res => {
    if (res["status"]) {
      this.propertyList[i].wishProperty = undefined;
      this.toastr.success(res["message"],"Success")
    }else{
      this.toastr.error(res["message"],"Error")
    }
  });
}


}
