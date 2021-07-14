import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountCustomerComponent } from './my-account-customer.component';

describe('MyAccountCustomerComponent', () => {
  let component: MyAccountCustomerComponent;
  let fixture: ComponentFixture<MyAccountCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
