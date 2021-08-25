import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAgentDetailsComponent } from './property-agent-details.component';

describe('PropertyAgentDetailsComponent', () => {
  let component: PropertyAgentDetailsComponent;
  let fixture: ComponentFixture<PropertyAgentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyAgentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAgentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
