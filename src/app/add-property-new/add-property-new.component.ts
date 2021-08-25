import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property-new',
  templateUrl: './add-property-new.component.html',
  styleUrls: ['./add-property-new.component.scss']
})
export class AddPropertyNewComponent implements OnInit {

  serviceForm: FormGroup;
  submitted: Boolean = false;
  propertyCategoryList: any;
  propertyTypeList: any;
  myFiles:string [] = [];
  imageLength: any;
  rationBtnShow: boolean = false;
  getDoc:any
  get360:any
  getVideo:any
  base64Image = []
  subscriptionList
  userData
  constructor(
    private FB: FormBuilder,
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
    // public dialogRef: MatDialogRef<AddPropertyComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.checkLogin()
    this.getPropertyCategoryList();
    this.getsubscriptionList()
  }
  getsubscriptionList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("UserSubscriptionList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.subscriptionList = res["data"];

        console.log("subscriptionList===", this.subscriptionList);
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }
  checkLogin() {
    if (this.webService.getLocalData("token") && this.webService.getLocalData("userData")) {

      this.userData = this.webService.getLocalData("userData");
      if(this.userData.expiry_date){
        var date = new Date()
        if(new Date(this.userData.expiry_date) < new Date())
        {
          alert("Your Subscription was expired, please renew subscription");
          this.router.navigate(["/add-property"]);
          return ;
        }
      }
      console.log("userData header local===",this.userData);
    }
  }

  get f() {
    return this.serviceForm.controls;
  }

  createForm() {
    this.serviceForm = this.FB.group({
      property_name: ["" , [Validators.required]],
      property_description: ["",[Validators.required, Validators.maxLength(200)]],
      property_price: ["", [Validators.required]],
      property_location: ["", [Validators.required]],
      property_image: [null],
      property_type: ["", [Validators.required]],
      property_category: ["",[Validators.required]],
      room_number: ["",[Validators.required]],
      bed_room_number: ["",[Validators.required]],
      longitude: [""],
      latitude:[""],
      property_sqft:["",[Validators.required]],
      property_doc: ["",[Validators.required]],
      property_details:["",[Validators.required]],
      property_niceties: ["",[Validators.required]],
      property_services: ["",[Validators.required]],
      add_new_project:[false],
      new_project_type:[""],
      youtube_link:[""],
      property_video:[""]
    });
    //this.changeSubCategoryValidation();
  }

  onSelectedGalleryImage(event) {
    this.base64Image = []
    this.myFiles = []
    this.imageLength = event.target.files.length;
    if(this.imageLength > this.subscriptionList.no_image){
      this.toastr.warning('You can image upload maximum '+ this.subscriptionList.no_image +' per property!!!', 'Warning')
      return;
    }
    for (var i = 0; i < event.target.files.length; i++) {
      if (
        event.target.files[i].type !== 'image/jpeg' &&
        event.target.files[i].type !== 'image/png' &&
        event.target.files[i].type !== 'image/jpg'
      ) {
        this.toastr.warning('Please upload image file')
        return;
      }
      this.myFiles.push(event.target.files[i]);
      console.log('.push(myFiles)', this.myFiles);

      const fr = new FileReader();
      fr.onloadend = (_loadEvent) => {

        const mainImage = fr.result;
        // console.log('mainImage===========',mainImage);

        this.base64Image.push(mainImage);
      };
      fr.readAsDataURL(event.target.files[i]);


    }


console.log('base64Image==================', this.base64Image)




  }

  onSelectedProperty360(event) {
    // if (
    //   event.target.files[0].type !== 'application/pdf' &&
    //   event.target.files[0].type !== 'image/jpeg' &&
    //   event.target.files[0].type !== 'image/png' &&
    //   event.target.files[0].type !== 'image/jpg'
    // ) {
    //   this.toastr.warning('Please upload image file')
    //   return;
    // }
    this.get360 = ''
    this.get360 = event.target.files[0];
    console.log('this.get360===============', this.getDoc)
    this.serviceForm.controls.property_360.setValue(event.target.files[0]);
  }

  onSelectedPropertyDoc(event) {
    if (
      event.target.files[0].type !== 'application/pdf' &&
      event.target.files[0].type !== 'image/jpeg' &&
      event.target.files[0].type !== 'image/png' &&
      event.target.files[0].type !== 'image/jpg'
    ) {
      this.toastr.warning('Please upload image file')
      return;
    }
    this.getDoc = ''
    this.getDoc = event.target.files[0];
    console.log('this.getDoc===============', this.getDoc)
    this.serviceForm.controls.property_doc.setValue(event.target.files[0]);
  }

  onSelectedPropertyVideo(event) {
    if (
      event.target.files[0].type !== 'video/mp4'
    ) {
      this.toastr.warning('Please upload mp4 video file')
      return;
    }
    this.getVideo = ''
    this.getVideo = event.target.files[0];
    console.log('this.getVideo===============', this.getVideo)
    this.serviceForm.controls.property_video.setValue(event.target.files[0]);
  }

  onNoClick(): void {
    let result = {
      result: false
    }
    // this.dialogRef.close(result);
  }

  handleAddressChange(address: Address) {
    this.serviceForm.controls.property_location.setValue(address.formatted_address);
    this.serviceForm.controls.longitude.setValue(address.geometry.location.lng());
    this.serviceForm.controls.latitude.setValue(address.geometry.location.lat());
  }

   submitProduct() {
    if(this.subscriptionList.no_properties){
      this.toastr.warning('You can add property maximum '+ this.subscriptionList.no_properties , 'Warning')
      return;
    }
    console.log("rationBtnShow===",this.rationBtnShow);
    let formData = new FormData();
    if(this.rationBtnShow == false) {
      this.serviceForm.removeControl('add_new_project');
      this.serviceForm.removeControl('new_project_type');
    }

    if(this.serviceForm.invalid) return this.submitted = true;
    console.log("serviceForm===",this.serviceForm.value);
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("property_image", this.myFiles[i]);
    }

    formData.append('property_description', this.serviceForm.value.property_description);
    formData.append('property_price', this.serviceForm.value.property_price);
    formData.append('property_location', this.serviceForm.value.property_location);
    formData.append('property_name', this.serviceForm.value.property_name);

    formData.append('property_type', this.serviceForm.value.property_type);
    formData.append('property_category', this.serviceForm.value.property_category);
    formData.append('room_number', this.serviceForm.value.room_number);
    formData.append('bed_room_number', this.serviceForm.value.bed_room_number);
    formData.append('longitude', this.serviceForm.value.longitude);
    formData.append('latitude', this.serviceForm.value.latitude);
    formData.append('property_sqft', this.serviceForm.value.property_sqft);
    formData.append('property_doc', this.getDoc);
    if(this.get360){

      formData.append('property_360', this.get360);
    }
    formData.append('property_video', this.getVideo);
    formData.append('property_details', this.serviceForm.value.property_details);
    formData.append('property_niceties', this.serviceForm.value.property_niceties);
    formData.append('youtube_link', this.serviceForm.value.youtube_link);
    formData.append('property_services', this.serviceForm.value.property_services);

    if(this.rationBtnShow == true) {
      formData.append('add_new_project', this.serviceForm.value.add_new_project);
      formData.append('new_project_type', this.serviceForm.value.new_project_type);
    }
    console.log('this.serviceForm.value=======================', this.serviceForm.value)
    // return
    this.webService.createPostWithImage({ url: BaseUrl.apiUrl("addProperty"),  body: formData, loading: true }).then(res => {
      if (res["status"]) {
        this.toastr.success(res["message"],"Success");
        this.router.navigate(["/manage-property"]);
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  getPropertyCategoryList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertyCategoryList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.propertyCategoryList = res["data"];
        this.getPropertyTypeList();
        console.log("propertyCategoryList===", this.propertyCategoryList);
        // this.toastr.success(res["message"],"Success");
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  getPropertyTypeList() {
    this.webService.createGet({ url: BaseUrl.apiUrl("propertyTypeList"), contentType: true, loading: true }).then(res => {
      if (res["status"]) {
        this.propertyTypeList = res["data"];
        console.log("categoryList===", this.propertyTypeList);
        // this.toastr.success(res["message"],"Success");
      }else{
        this.toastr.error(res["message"],"Error")
      }
    })
  }

  selectCheckBox(e) {
    console.log("e======",e);
    this.rationBtnShow = e;
    this.serviceForm.controls.add_new_project.setValue(e);
  }

}
