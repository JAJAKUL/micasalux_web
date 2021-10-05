import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebService } from '../services/web.service';
import { BaseUrl } from "../services/base.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup;
  submitted: Boolean = false;

  constructor(
    private FB: FormBuilder,
    private webService: WebService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.forgetForm.controls;
  }

  createForm() {
    this.forgetForm = this.FB.group({
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  submitForm() {
    this.webService.createPut({ url: BaseUrl.apiUrl("forgotPassword"), body: this.forgetForm.value, contentType: true, loading: true }).then(res => {
      console.log('response====================', res)
      if (res["status"]) {
        this.toastr.success(res["message"],"Success");
        this.router.navigate(['/login']);
      }else{
        console.log("res error");
        this.toastr.error(res["message"],"Error")
      }

    })
  }

}
