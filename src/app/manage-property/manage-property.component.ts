import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from 'src/app/services/web.service';
import { BaseUrl } from 'src/app/services/base.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from 'src/app/shared/add-property/add-property.component';
import swal from "sweetalert2";

@Component({
  selector: 'app-manage-property',
  templateUrl: './manage-property.component.html',
  styleUrls: ['./manage-property.component.scss']
})
export class ManagePropertyComponent implements OnInit {
  appoinmentList:any
  userData: any;
  propertyList: any;
  agentTypeList: any;
  subAgentTypeList: any;

  constructor(
    private FB: FormBuilder,
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if(this.userData != '' && this.userData != null) {
      if( this.userData.UserType == '2') {
        this.getAgentTypelist();
        this.getPropertylist();
      } else{
        this.router.navigate(["/home"]);
        this.toastr.info("Please login as a Property Agent")
      }
    } else {
      this.router.navigate(["/home"]);
    }
  }

  removePropertyBtnClick(id) {
    swal
      .fire({
        title: "Are you sure?",
        text: "You will not be able to recover this data",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      })
      .then((result) => {
        if (result.value) {

          this.webService.createGet({ url: BaseUrl.apiUrl("removeProperty")+"?propertyId="+id, contentType: true, loading: true }).then(res => {
            if (res["status"]) {
              this.ngOnInit()
              // this.propertyList.splice(i,1);
              this.toastr.success(res["message"],"Success")
            }else{
              this.toastr.error(res["message"],"Error")
            }
          });
        }
      });
  }

  // removePropertyBtnClick(id) {


  //   this.webService.createGet({ url: BaseUrl.apiUrl("removeProperty")+"?propertyId="+id, contentType: true, loading: true }).then(res => {
  //     if (res["status"]) {
  //       this.ngOnInit()
  //       // this.propertyList.splice(i,1);
  //       this.toastr.success(res["message"],"Success")
  //     }else{
  //       this.toastr.error(res["message"],"Error")
  //     }
  //   });


  // }

  activeDeactivePropertyBtnClick(id) {
    this.webService.createGet({ url: BaseUrl.apiUrl("activeAndDeactiveProperty")+"?propertyId="+id, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.ngOnInit()
        // this.propertyList.splice(i,1);
        this.toastr.success(res["message"],"Success")
      }else{
        this.toastr.error(res["message"],"Error")
      }
    });
  }


  editProperty(propertyId){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "propertyId" : encodeURIComponent(propertyId)
      }
    }
    this.router.navigate(['/edit-property'],navigationExtras);
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



  addProperty() {
    console.log("addProperty click work.");
    this.router.navigate(["/add-property"]);

  //   const dialogRef = this._dialog.open(AddPropertyComponent, {
  //     width: '500px',
  //     panelClass: 'AddPropertyComponent',
  //     data: {},
  //     // disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     //let found = false;
  //     if (result && result.result === true) {
  //         this.getPropertylist();
  //     }
  // });
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


}
