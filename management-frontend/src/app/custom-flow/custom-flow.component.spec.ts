import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFlowComponent } from './custom-flow.component';

describe('CustomFlowComponent', () => {
  let component: CustomFlowComponent;
  let fixture: ComponentFixture<CustomFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
