import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-property-agent-list',
  templateUrl: './property-agent-list.component.html',
  styleUrls: ['./property-agent-list.component.scss']
})
export class PropertyAgentListComponent implements OnInit {

  searchData: any;
  propertyCategoryList: any;
  propertyList: any;
  searchLocation: any;
  wishPropertyList: any;
  userLoginStatus: boolean = false;
  userData: any;

  constructor(
    private router: Router,
    private activeRoute : ActivatedRoute,
    private webService: WebService,
    private toastr: ToastrService
    ) {


  }

  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.params.id);
    // this.activeRoute.queryParams.subscribe(queryParams => {
    //   console.log("queryParams===",queryParams)
    //   this.searchData = queryParams['name'];
    //   this.searchData = queryParams;
    //   this.getPropertyList();
    // });
   this.searchData = this.activeRoute.snapshot.params.id;
   if(this.searchData){
    this.getPropertyList();

   }

    // this.getPropertyCategoryList();
    // this.getPropertyList();

  }

//  gotoPropertyDetails(propertyId){
//   let navigationExtras: NavigationExtras = {
//     queryParams: {
//       "propertyId" : encodeURIComponent(propertyId)
//     }
//   }
//   this.router.navigate(['/property-details'],navigationExtras);
//  }

//  getPropertyCategoryList() {
//   this.webService.createGet({ url: BaseUrl.apiUrl("propertyCategoryList"), contentType: true, loading: true }).then(res => {
//     if (res["status"]) {
//       this.propertyCategoryList = res["data"];
//       console.log("propertyCategoryList===", this.propertyCategoryList);
//     }else{
//       this.toastr.error(res["message"],"Error")
//     }
//   })
// }

 getPropertyList() {
   console.log("this.searchData===",this.searchData)

     this.userLoginStatus = true;
  //  console.log("this.userData===")
    var obj ={
      agent_type_name: this.searchData
    }
     this.webService.createPost({ url: BaseUrl.apiUrl("getAgentList"), body: obj, contentType: true, loading: true }).then(res => {
      console.log('res==============', res)

      if (res["status"]) {
        this.propertyList = res["data"];
        this.propertyList.forEach(element => {
          if(element.profile) {
            element.profile = BaseUrl.baseUrl+'/'+element.profile
          } else{
            element.profile = './assets/images/image-not-available.png'
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
