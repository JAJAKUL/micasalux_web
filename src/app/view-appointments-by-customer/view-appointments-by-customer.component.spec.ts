import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentsByCustomerComponent } from './view-appointments-by-customer.component';

describe('ViewAppointmentsByCustomerComponent', () => {
  let component: ViewAppointmentsByCustomerComponent;
  let fixture: ComponentFixture<ViewAppointmentsByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAppointmentsByCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAppointmentsByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
