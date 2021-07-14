import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  propertyList: any;
  
  constructor(
    private router: Router,
    private activeRoute : ActivatedRoute,
    private webService: WebService,
    private toastr: ToastrService
  ) {
    this.getPropertyList();
   }

  ngOnInit(): void {
  }

  getPropertyList() {
   this.webService.createGet({ url: BaseUrl.apiUrl("wishPropertyList"), contentType: true, loading: true }).then(res => {
     if (res["status"]) {
       this.propertyList = res["data"];
       this.propertyList.forEach(element => {
         if(element.wishProperty.property_image) {
           element.wishProperty.property_image = BaseUrl.baseUrl+'/'+element.wishProperty.property_image[0].url
         } else{
           element.wishProperty.property_image = 'assets/images/image-not-available.png'
         }
       });
       console.log("propertyCategoryList===", this.propertyList);
     }else{
       this.toastr.error(res["message"],"Error")
     }
   })
  }

  removeWishBtnClick(id,i) {
    this.webService.createGet({ url: BaseUrl.apiUrl("removewishproperty")+"?propertyId="+id, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.propertyList.splice(i,1);
        this.toastr.success(res["message"],"Success")
      }else{
        this.toastr.error(res["message"],"Error")
      }
    });
  }

  gotoPropertyDetails(propertyId){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "propertyId" : encodeURIComponent(propertyId)
      }
    }
    this.router.navigate(['/property-details'],navigationExtras);
   }

}
