import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var google: any;
declare var $:any;
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

  constructor() { 
    
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
  }

}
