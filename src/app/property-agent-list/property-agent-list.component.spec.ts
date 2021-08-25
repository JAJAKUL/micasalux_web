import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAgentListComponent } from './property-agent-list.component';

describe('PropertyAgentListComponent', () => {
  let component: PropertyAgentListComponent;
  let fixture: ComponentFixture<PropertyAgentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyAgentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
