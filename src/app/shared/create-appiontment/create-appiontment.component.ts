import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { WebService } from 'src/app/services/web.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { BaseUrl } from 'src/app/services/base.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-create-appiontment',
  templateUrl: './create-appiontment.component.html',
  styleUrls: ['./create-appiontment.component.scss']
})
export class CreateAppiontmentComponent implements OnInit {
  propertyDetails: any;
  userData: any;
  createAppoinmentForm: FormGroup;
  selecredDate: any;
  selectedTime: any;
  propertyCategoryList: any;
  customerData:any
  day1:any
  day2:any
  day3:any
  day4:any
  day5:any
  day6:any
  dateArr:any = []
  bookingDate:any
  constructor(
    private FB: FormBuilder,
    private webService: WebService,
    private toastr: ToastrService,
    public router: Router,
    public dialogRef: MatDialogRef<CreateAppiontmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.propertyDetails = this.data.propertyDetails;
    this.userData = this.data.userData;
   }

  ngOnInit(): void {
    var date = new Date()
    this.getAppointDate()

    this.customerData = JSON.parse(localStorage.getItem('userData'));
    if(this.customerData != '' && this.customerData != null) {


    }
    this.createAppionmentForm();
    this.getPropertyCategoryList();
  }
  selectTime(item){

  }
getAppointDate(){
  var date = new Date()
  this.dateArr = []
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date();
  var dayName = days[d.getDay()];
  // console.log('day1==============', dayName )
  for(let i=0;i<7;i++){
    var date1 = new Date()
    var compDate = new Date()
    var dat = new Date(compDate.setDate(date.getDate() + i))
    console.log('days[d.getDay()]================', days[dat.getDay()])
    if(days[dat.getDay()] != 'Sunday'){
      this.dateArr.push({date :new Date(date1.setDate(date1.getDate() + i)),isChecked:false})
    }
  }
  console.log('this.dateArr==============', this.dateArr )


}
selectDate(data){

  data.isChecked = true
  this.bookingDate = ''
  this.bookingDate = data.date
  console.log('this.data ====================', data.date )
  console.log('this.bookingDate ====================', this.bookingDate )
}
  createAppionmentForm() {
    this.createAppoinmentForm = this.FB.group({
      customer_name: [this.userData && this.userData.FullName != undefined ? this.userData.FullName: "" , [Validators.required]],
      customer_email:[this.userData && this.userData.Email != undefined ? this.userData.Email: "",[Validators.required]],
      // booking_Address: [this.propertyDetails && this.propertyDetails.property_location != undefined ? this.propertyDetails.property_location: "",[Validators.required]],
      // booking_location: [this.propertyDetails && this.propertyDetails.location != undefined ? this.propertyDetails.location: ""],
      booking_phone: [this.userData && this.userData.Phone != undefined ? this.userData.Phone: "" , [Validators.required]],
      property_category: [this.propertyDetails && this.propertyDetails.property_category != undefined ? this.propertyDetails.property_category: "",[Validators.required]],
      property_name: [this.propertyDetails && this.propertyDetails.property_name != undefined ? this.propertyDetails.property_name: "",[Validators.required]],
      HairUser:[this.propertyDetails && this.propertyDetails.create_by != undefined ? this.propertyDetails.create_by._id: ""],
      bookingDate:["",[Validators.required]],
      userId:[""],
      // booking_time:["",[Validators.required]],
      bookingProperty: [this.propertyDetails._id]
      // bookingProperty: ["",[Validators.required]]
    });
  }

  submitCreateAppoinmentForm(){
    if(this.customerData != '' && this.customerData != null) {

      this.createAppoinmentForm.controls.userId.setValue(this.customerData._id);

    }
    if(this.bookingDate != '' && this.bookingDate != null) {

      this.createAppoinmentForm.controls.bookingDate.setValue(this.bookingDate);

    }
    console.log("createAppoinmentForm===",this.createAppoinmentForm.value);
    this.webService.createPost({ url: BaseUrl.apiUrl("bookingProperty"),  body: this.createAppoinmentForm.value, loading: true }).then(res => {
      if (res["status"]) {
        this.toastr.success(res["message"],"Success");
        this.dialogRef.close({result: true});
        if(this.userData){

          this.router.navigate(["/view-appointments-by-customer"]);
        }
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  onNoClick(): void {
    let result = {
      result: false
    }
    this.dialogRef.close(result);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log("event===",event.value);
    var date = new Date(event.value);
    console.log("date.toISOString()==",date.toISOString())
    this.selecredDate = date.toISOString().substring(0, 10);
    // this.events.push(`${type}: ${event.value}`);
  }

  timeChangeData(e){
    var d = this.selecredDate+" "+e
    var date = new Date(d);
    this.selectedTime = date.toISOString();
    console.log("this.time==", this.selectedTime)
    this.createAppoinmentForm.controls.bookingDate.setValue(this.selectedTime);
  }

  handleAddressChange(address: Address) {
    console.log("address.geometry.location.lng()==",address.geometry.location.lng())
    this.createAppoinmentForm.controls.property_location.setValue(address.formatted_address);
    let location = {
      type:"Point",
      coordinates:[
        address.geometry.location.lng(),
        address.geometry.location.lat()
      ]
    }
    this.createAppoinmentForm.controls.location.setValue(location)
    // this.serviceForm.controls.longitude.setValue(address.geometry.location.lng());
    // this.serviceForm.controls.latitude.setValue(address.geometry.location.lat());
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



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: false,
    navText: [ '<i class="prev-icon"></i>', '<i class="next-icon"></i>' ],
    autoplay:false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 4,
      },
      500: {
        items: 4,
      },
      1000: {
        items: 5,
      }
    }
  }
}
