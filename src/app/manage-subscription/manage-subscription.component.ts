import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";

@Component({
  selector: 'app-manage-subscription',
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.scss']
})
export class ManageSubscriptionComponent implements OnInit {
  subscriptionList: any;
  constructor(
    private router: Router,
    private webService: WebService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getsubscriptionList();
  }

  getsubscriptionList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("UserSubscriptionList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.subscriptionList = res["data"];

        console.log("propertyCategoryList===", this.subscriptionList);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

}
