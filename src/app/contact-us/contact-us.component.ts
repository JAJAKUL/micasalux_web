import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var google: any;
declare var $:any;
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  step = 0;
  propertyCategoryList: any;
  propertyTypeList: any;
  searchData: any;
  property_category: any;
  newsList: any;
  userData :any;
  getData:any
  contactForm: FormGroup;

  constructor(
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute : ActivatedRoute,
    private fb: FormBuilder,

  ) {
        this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getData = {}
    var mapOptions= {
      center: {
        lat: 43.64344769999999,
        lng: -79.380939
      },
      disableDefaultUI: true,
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
    var	latLng = new google.maps.LatLng(43.64344769999999, -79.380939);
    console.log('latlng', latLng);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: 'Andraw',
      icon: 'assets/images/marker-icon.png',
    });
    $(window).on('load', function() {
      var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        // percentPosition: true,
        // columnWidth: 180
      });
    });
  }
  addContact(){
    if (this.contactForm.invalid) return;
    console.log('this.getData===========================', this.getData)
    // return
    // this.getData.property_id = this.propertyDetails._id
    // this.getData.agent_id = this.propertyDetails.create_by._id
    // if(this.userData) {
    //   this.getData.customer_id = this.userData._id
    // }
    this.webService.createPost({ url: BaseUrl.apiUrl("contactUs"), body: this.getData, contentType: true, loading: true }).then(res => {
      console.log('response data ===================', res)
      if (res["status"]) {
        $('#Contact').modal('hide')
        this.toastr.success(res["message"],"Success")
        this.contactForm.reset()

      }else{
        this.toastr.error(res["message"],"Error")
      }
    })

  }
}
