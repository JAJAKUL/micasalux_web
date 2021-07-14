import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountListingComponent } from './my-account-listing.component';

describe('MyAccountListingComponent', () => {
  let component: MyAccountListingComponent;
  let fixture: ComponentFixture<MyAccountListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
