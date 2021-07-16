import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var google: any;
declare var $:any;
import Masonry from 'masonry-layout';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  step = 0;
  propertyCategoryList: any;
  propertyTypeList: any;
  searchData: any;
  property_category: any;
  newsList: any;

  constructor(
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getPropertyCategoryList();
    this.getPropertyTypeList();
    this.getNewsList();
  }

  ngOnInit(): void {
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

    this.searchData = {
    longitude: 0,
    latitude: 0,
    property_category: '',
    property_type: '',
    room_number: '',
    bed_room_number: '',
    property_price: '',
    property_location: ''
    }

  }

  getPropertyCategoryList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertyCategoryList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.propertyCategoryList = res["data"];
        console.log("propertyCategoryList===", this.propertyCategoryList);
        // this.toastr.success(res["message"],"Success");
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  getNewsList(){
    this.webService.createGet({ url: BaseUrl.apiUrl("newsList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.newsList = res["data"];
        console.log("newsList===", this.newsList);
        this.newsList.forEach(element => {
          if(element.news_image) {
            element.news_image = BaseUrl.baseUrl+"/"+element.news_image;
          } else {
            element.news_image = '../../../assets/img/favicon.png'
          }
        });
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  getPropertyTypeList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertyTypeList"), contentType: true, loading: true }).then(res => {
      console.log('response====================', res)
      if (res["status"]) {
        this.propertyTypeList = res["data"];
        console.log("categoryList===", this.propertyTypeList);
        // this.toastr.success(res["message"],"Success");
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  searchProperty(){
    console.log(this.searchData);
    console.log("property_category==",this.property_category)
    // this.router.navigate(['/properties'],{
    //   queryParams: {
    //     property_category: this.searchData.property_category
    //   }
    // })
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "property_category"   : encodeURIComponent(this.searchData.property_category),
        "property_type"   : encodeURIComponent(this.searchData.property_type),
        "longitude"   : encodeURIComponent(this.searchData.longitude),
        "latitude"   : encodeURIComponent(this.searchData.latitude),
        "property_location" : encodeURIComponent(this.searchData.property_location),
        "room_number"   : encodeURIComponent(this.searchData.room_number),
        "bed_room_number"   : encodeURIComponent(this.searchData.bed_room_number),
        "property_price"   : encodeURIComponent(this.searchData.property_price)
      }
    }

    this.router.navigate(["/properties"], navigationExtras);
  }

  handleAddressChange(address: Address) {
    this.searchData.property_location = address.formatted_address;
    this.searchData.latitude = address.geometry.location.lat();
    this.searchData.longitude = address.geometry.location.lng();
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    nav: false,
    autoplay:true,
    autoplayTimeout: 2000,
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

  caSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    nav: false,
    autoplay:true,
    autoplayTimeout: 2000,
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
