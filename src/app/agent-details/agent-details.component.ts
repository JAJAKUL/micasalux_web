import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAppiontmentComponent } from '../shared/create-appiontment/create-appiontment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss']
})
export class AgentDetailsComponent implements OnInit {
  propertyId: any;
  propertyDetails: any;
  userData: any;
  createAppoinmentForm: FormGroup;
  
  constructor(
    private FB: FormBuilder,
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute : ActivatedRoute,
    private _dialog: MatDialog,
  ) { 
    { 
      this.propertyId = decodeURIComponent(this.activeRoute.snapshot.queryParams['propertyId']);
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getPropertyDetails();
  }

  ngOnInit(): void {
  }

  getPropertyDetails() {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertyDetails")+"?propertyId="+this.propertyId, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.propertyDetails = res["data"];
        this.webService.removeLocalData("agentDetails");
        if(this.propertyDetails.create_by.profile) {
          this.propertyDetails.create_by.profile = BaseUrl.baseUrl+'/'+this.propertyDetails.create_by.profile;
        } else{
          this.propertyDetails.create_by.profile = 'assets/images/image-not-available.png'
        }
        console.log("propertyDetails===", this.propertyDetails);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  createAppionment(){
      this.webService.saveLocalData("agentDetails", this.propertyId);
      this.router.navigate(['/login']);
  }

  openCreateAppoinmentForm() {
    console.log("addProperty click work.");
    const dialogRef = this._dialog.open(CreateAppiontmentComponent, {
      width: '500px',
      panelClass: 'CreateAppiontmentComponent',
      data: {propertyDetails: this.propertyDetails,userData: this.userData},
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //let found = false;
      if (result && result.result === true) {
          // this.getPropertylist();
      }
  });
  }

}
