import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
declare var google: any;
declare var $:any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAppiontmentComponent } from '../shared/create-appiontment/create-appiontment.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  propertyDetails: any;
  propertyId: any;
  userData :any;
  getData:any
  contactForm: FormGroup;
  appointmentForm: FormGroup;
  galleryImage = false
  mapOpen = true
  modalVideo = false
  controllerSrc
  userLoginStatus: boolean = false;
  constructor(
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute : ActivatedRoute,
    private fb: FormBuilder,
    private _dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.propertyId = decodeURIComponent(this.activeRoute.snapshot.queryParams['propertyId']);

    this.userData = JSON.parse(localStorage.getItem('userData'));
    if(this.userData){
      this.userData.profile = BaseUrl.baseUrl+'/'+this.userData.profile
    }
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });


  }

  ngOnInit(): void {
    this.getData = {}
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


    // var mapOptions= {
    //   center: {
    //     lat: this.propertyDetails.location.coordinates[1],
    //     lng: this.propertyDetails.location.coordinates[0]
    //   },
    //   // center: {
    //   //   lat: 43.64344769999999,
    //   //   lng: -79.380939
    //   // },
    //   disableDefaultUI: true,
    //   zoom: 20,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // }
    // var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
    // var	latLng = new google.maps.LatLng(43.64344769999999, -79.380939);
    // console.log('latlng', latLng);
    // var marker = new google.maps.Marker({
    //   position: latLng,
    //   map: map,
    //   title: 'Andraw',
    //   icon: 'assets/images/marker-icon.png',
    // });
    // $(window).on('load', function() {
    //   var $grid = $('.grid').masonry({
    //     itemSelector: '.grid-item',
    //     // percentPosition: true,
    //     // columnWidth: 180
    //   });
    // });

  }

  getSafeUrl(url) {
    if (!url) { return ''; }
    if(url){
       url = url.replace('watch?v=','embed/');
    }
  // debugger;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
}
  openGallery(){
    this.mapOpen = false
    this.modalVideo = false
    this.galleryImage = true
  }
  openVideo(){
    this.mapOpen = false
    this.galleryImage = false
    this.modalVideo = true
  }
  openMap(){
    this.galleryImage = false
    this.modalVideo = false
    this.mapOpen = true
    var mapOptions= {
      center: {
        lat: this.propertyDetails.location.coordinates[1],
        lng: this.propertyDetails.location.coordinates[0]
      },
      // center: {
      //   lat: 43.64344769999999,
      //   lng: -79.380939
      // },
      disableDefaultUI: true,
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
    var	latLng = new google.maps.LatLng(this.propertyDetails.location.coordinates[1], this.propertyDetails.location.coordinates[0]);
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
      // this.mapOpen = false
    });
  }
  transform(_url:any){
    if (!_url) { return ''; }
    if(_url){
    _url = _url.replace('watch?v=','embed/');
    }
  }
  getPropertyDetails() {
    if(this.userData) {
      this.userLoginStatus = true;
    console.log("this.userData===")

    this.webService.createGet({ url: BaseUrl.apiUrl("propertyDetails")+"?propertyId="+this.propertyId+"&userOnline="+this.userLoginStatus+"&userId="+this.userData._id, contentType: true, loading: true }).then(res => {
      console.log('response data ===================', res)
      if (res["status"]) {
        this.propertyDetails = res["data"];
        if(this.propertyDetails.property_image != null && this.propertyDetails.property_image != "" && this.propertyDetails.property_image != undefined && this.propertyDetails.property_image.length > 0) {
          this.propertyDetails.property_image.forEach(element => {
            console.log("element.url===",element.url)
              element.url = BaseUrl.baseUrl+'/'+element.url
          });

        } else{
          this.propertyDetails.property_image[0].url = './assets/images/image-not-available.png'
        }
        if(this.propertyDetails.create_by.profile){
          this.propertyDetails.create_by.profile = BaseUrl.baseUrl+'/'+this.propertyDetails.create_by.profile
        }

        if(this.propertyDetails.youtube_link){
          this.controllerSrc = this.getSafeUrl(this.propertyDetails.youtube_link);
        }


        var mapOptions= {
          center: {
            lat: this.propertyDetails.location.coordinates[1],
            lng: this.propertyDetails.location.coordinates[0]
          },
          // center: {
          //   lat: 43.64344769999999,
          //   lng: -79.380939
          // },
          disableDefaultUI: true,
          zoom: 20,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
        var	latLng = new google.maps.LatLng(this.propertyDetails.location.coordinates[1], this.propertyDetails.location.coordinates[0]);
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
          this.mapOpen = false
        });
        console.log("propertyDetails===", this.propertyDetails);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  } else {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertyDetails")+"?propertyId="+this.propertyId+"&userOnline="+this.userLoginStatus, contentType: true, loading: true }).then(res => {
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
        if(this.propertyDetails.create_by.profile){
          this.propertyDetails.create_by.profile = BaseUrl.baseUrl+'/'+this.propertyDetails.create_by.profile
        }

        if(this.propertyDetails.youtube_link){
          this.controllerSrc = this.getSafeUrl(this.propertyDetails.youtube_link);
        }


        var mapOptions= {
          center: {
            lat: this.propertyDetails.location.coordinates[1],
            lng: this.propertyDetails.location.coordinates[0]
          },
          // center: {
          //   lat: 43.64344769999999,
          //   lng: -79.380939
          // },
          disableDefaultUI: true,
          zoom: 20,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
        var	latLng = new google.maps.LatLng(this.propertyDetails.location.coordinates[1], this.propertyDetails.location.coordinates[0]);
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
          this.mapOpen = false
        });
        console.log("propertyDetails===", this.propertyDetails);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }
  }




  addContact(){
    if (this.contactForm.invalid) return;
    console.log('this.getData===========================', this.getData)
    this.getData.property_id = this.propertyDetails._id
    this.getData.agent_id = this.propertyDetails.create_by._id
    if(this.userData) {
      this.getData.customer_id = this.userData._id
    }
    this.webService.createPost({ url: BaseUrl.apiUrl("contactToAgent"), body: this.getData, contentType: true, loading: true }).then(res => {
      console.log('response data ===================', res)
      if (res["status"]) {
        $('#Contact').modal('hide')
        this.toastr.success(res["message"],"Success")
        this.contactForm.reset()
        // this.propertyDetails = res["data"];
        // if(this.propertyDetails.property_image != null && this.propertyDetails.property_image != "" && this.propertyDetails.property_image != undefined && this.propertyDetails.property_image.length > 0) {
        //   this.propertyDetails.property_image.forEach(element => {
        //     console.log("element.url===",element.url)
        //       element.url = BaseUrl.baseUrl+'/'+element.url
        //   });
        // } else{
        //   this.propertyDetails.property_image[0].url = 'assets/images/image-not-available.png'
        // }
        // console.log("propertyDetails===", this.propertyDetails);
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

wishBtnClick(id) {
  if(this.userData == false) {
    this.toastr.error("Please Login Your Account","Error")
    return;
  } else {
    this.webService.createGet({ url: BaseUrl.apiUrl("addInWishProperty")+"?propertyId="+id, contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        console.log("res['data']==",res['data'])
        this.ngOnInit()
          // this.propertyList[i].wishProperty = res['data']._id;
          // console.log("propertyCategoryList===", this.propertyList);
        this.toastr.success(res["message"],"Success")
      }else{
        this.toastr.error(res["message"],"Error")
      }
    });
  }
}

removeWishBtnClick(id) {
  this.webService.createGet({ url: BaseUrl.apiUrl("removewishproperty")+"?propertyId="+id, contentType: true, loading: true }).then(res => {
    console.log("res['data']==",res)

    if (res["status"]) {
      this.ngOnInit()
      // this.propertyList[i].wishProperty = undefined;
      this.toastr.success(res["message"],"Success")
    }else{
      this.toastr.error(res["message"],"Error")
    }
  });
}

}
