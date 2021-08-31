import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  userData :any;
  getData:any
  constructor(
    private webService: WebService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getData = {}
    this.getAboutUsCont()
  }

  getAboutUsCont(){
    this.webService.createGet({ url: BaseUrl.apiUrl("aboutUs"), contentType: true, loading: true }).then(res => {
      console.log('response data ===================', res)
      if (res["status"]) {
        this.getData = res["data"]
        // if(this.getData.image) {
        //   this.getData.image = BaseUrl.baseUrl+'/'+this.getData.image
        // }


      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

}
