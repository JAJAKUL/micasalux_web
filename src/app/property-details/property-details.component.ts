import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
declare var $:any;

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  propertyDetails: any;
  propertyId: any;

  constructor(
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute : ActivatedRoute,
  ) {
    this.propertyId = decodeURIComponent(this.activeRoute.snapshot.queryParams['propertyId']);
  }

  ngOnInit(): void {
    this.getPropertyDetails();
    $('.calculator-btn').click(function() {
      $('#calculate-form').slideToggle();
      alert('hi');
    });
    $('.calculate-close').click(function() {
        $('#calculate-form').slideUp();
    });
    $('.comment-btn').click(function() {
      $('#comment-form').slideToggle();
    });
    $('.comment-close').click(function() {
        $('#comment-form').slideUp();
    });
  }

  getPropertyDetails() {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertyDetails")+"?propertyId="+this.propertyId, contentType: true, loading: true }).then(res => {
      console.log('response data ===================', res)
      if (res["status"]) {
        this.propertyDetails = res["data"];
        if(this.propertyDetails.property_image != null && this.propertyDetails.property_image != "" && this.propertyDetails.property_image != undefined && this.propertyDetails.property_image.length > 0) {
          this.propertyDetails.property_image.forEach(element => {
            console.log("element.url===",element.url)
              element.url = BaseUrl.baseUrl+'/'+element.url
          });
        } else{
          this.propertyDetails.property_image[0].url = 'assets/images/image-not-available.png'
        }
        console.log("propertyDetails===", this.propertyDetails);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  viewPropertyAgentDetails() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "propertyId" : encodeURIComponent(this.propertyId)
      }
    }
    this.router.navigate(['/agent-details'],navigationExtras);
  }

  property_doc_upload(){
    window.open(BaseUrl.baseUrl+"/"+this.propertyDetails.property_doc);
    // window.location.href = BaseUrl.baseUrl+"/"+this.propertyDetails.property_doc;
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: true,
    navText: [ '<i class="prev-icon"></i>', '<i class="next-icon"></i>' ],
    autoplay:true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }
}
