import { Component, OnInit } from '@angular/core';
declare var $:any;
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
import { Address } from 'ngx-google-places-autocomplete/objects/address';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  searchData: any;
  propertyCategoryList: any;
  propertyList: any;
  searchLocation: any;
  wishPropertyList: any;
  userLoginStatus: boolean = false;
  userData: any;
  p: number = 1;
  totalItems
  offset
  limit
  itemPerPage:number = 9;
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
    this.offset=0
    this.itemPerPage=9
    this.limit=9

    this.activeRoute.queryParams.subscribe(queryParams => {
      this.searchLocation = queryParams.property_location;
      // this.getPropertyCategoryList();
      console.log("queryParams===",queryParams)
      this.searchData = queryParams;
      var obj = {
        offset : 	this.offset,
        limit: this.limit
      }
      this.getPropertyList(obj);
    });

    // this.getPropertyCategoryList();
    // this.getPropertyList();

  }
  pageChange(event){
    console.log('event==============', event)
    this.p = event
    for (var i = 0; i < this.p; i++) {
			this.offset=(i*9)
			console.log(this.offset)

		}
    var obj = {
      offset : 	this.offset,
      limit: this.limit
    }
    console.log('this.offset===============', obj)
    this.getPropertyList(obj);
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

 getPropertyList(obj) {
   console.log("this.searchData===",this.searchData)
   if(this.userData) {
     this.userLoginStatus = true;
    console.log("this.userData===")

     this.webService.createPost({ url: BaseUrl.apiUrl("getPropertylist")+"?userOnline="+this.userLoginStatus, body:obj, contentType: true, loading: true }).then(res => {
      console.log('res==============', res)

      if (res["status"]) {
        this.propertyList = res["data"];
        this.totalItems = res["count"]
        this.propertyList.forEach(element => {
          if(element.property_image) {
            element.property_image = BaseUrl.baseUrl+'/'+element.property_image[0].url
          } else{
            element.property_image = 'assets/images/image-not-available.png'
          }
        });
        // console.log("propertyCategoryList[0]===", this.propertyList[0].wishProperty);
        // console.log("propertyCategoryList===", this.propertyList);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
   } else {
   console.log("this.userData===false")

    this.userLoginStatus = false;
    this.webService.createPost({ url: BaseUrl.apiUrl("getPropertyAnyUser")+"?userOnline="+this.userLoginStatus, body:obj, contentType: true, loading: true }).then(res => {
      console.log('res==============', res)
      if (res["status"]) {
        this.propertyList = res["data"];
        this.totalItems = res["count"]

        this.propertyList.forEach(element => {
          if(element.property_image) {
            element.property_image = BaseUrl.baseUrl+'/'+element.property_image[0].url
          } else{
            element.property_image = 'assets/images/image-not-available.png'
          }
        });
        // console.log("propertyCategoryList[0]===", this.propertyList[0].wishProperty);
        // console.log("propertyCategoryList===", this.propertyList);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
   }
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
