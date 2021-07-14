import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";

@Component({
  selector: 'app-provider-appointment-list',
  templateUrl: './provider-appointment-list.component.html',
  styleUrls: ['./provider-appointment-list.component.scss']
})
export class ProviderAppointmentListComponent implements OnInit {
  appoinmentList: any;
  constructor(
    private router: Router,
    private webService: WebService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getappoinmentList();
  }

  getappoinmentList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("customerappoinmentlist"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.appoinmentList = res["data"];
        this.appoinmentList.forEach(element => {
          if(element.createdBy.profile != "" && element.createdBy.profile != undefined && element.createdBy.profile != null) {
            element.createdBy.profile = BaseUrl.baseUrl+'/'+element.createdBy.profile
          } else{
            element.createdBy.profile = 'assets/images/image-not-available.png'
          }
        });
        console.log("propertyCategoryList===", this.appoinmentList);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

}
