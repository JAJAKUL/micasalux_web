import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppiontmentComponent } from './create-appiontment.component';

describe('CreateAppiontmentComponent', () => {
  let component: CreateAppiontmentComponent;
  let fixture: ComponentFixture<CreateAppiontmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppiontmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppiontmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
