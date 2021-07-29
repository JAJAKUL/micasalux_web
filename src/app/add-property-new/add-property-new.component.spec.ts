import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyNewComponent } from './add-property-new.component';

describe('AddPropertyNewComponent', () => {
  let component: AddPropertyNewComponent;
  let fixture: ComponentFixture<AddPropertyNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPropertyNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
