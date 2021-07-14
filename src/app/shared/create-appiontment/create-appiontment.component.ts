import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { WebService } from 'src/app/services/web.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { BaseUrl } from 'src/app/services/base.service'; 
import { Router } from '@angular/router';

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
    this.createAppionmentForm();
    this.getPropertyCategoryList();
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
      // booking_time:["",[Validators.required]],
      bookingProperty: [this.propertyDetails._id]
      // bookingProperty: ["",[Validators.required]]
    });
  }

  submitCreateAppoinmentForm(){
    console.log("createAppoinmentForm===",this.createAppoinmentForm.value);
    this.webService.createPost({ url: BaseUrl.apiUrl("bookingProperty"),  body: this.createAppoinmentForm.value, loading: true }).then(res => {
      if (res["status"]) {
        this.toastr.success(res["message"],"Success");
        this.dialogRef.close({result: true});
        this.router.navigate(["/view-appointments-by-customer"]);
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

}
