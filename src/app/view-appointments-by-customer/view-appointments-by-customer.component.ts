import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";

@Component({
  selector: 'app-view-appointments-by-customer',
  templateUrl: './view-appointments-by-customer.component.html',
  styleUrls: ['./view-appointments-by-customer.component.scss']
})
export class ViewAppointmentsByCustomerComponent implements OnInit {
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
    this.webService.createGet({ url: BaseUrl.apiUrl("appoinmentList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.appoinmentList = res["data"];
        this.appoinmentList.forEach(element => {
          if(element.HairUser.profile) {
            element.HairUser.profile = BaseUrl.baseUrl+'/'+element.HairUser.profile
          } else{
            element.HairUser.profile = 'assets/images/image-not-available.png'
          }
        });
        console.log("propertyCategoryList===", this.appoinmentList);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

}
