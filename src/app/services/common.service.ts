import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CommonService {
  private loading = new Subject<any>();
  loadingCompCalled = this.loading.asObservable();
  constructor() { }

  showLoading() {
    // console.log("show loading");
    this.loading.next(true);
  }

  hideLoading() {
    // console.log("hide loading");
    this.loading.next(false);
  }
}