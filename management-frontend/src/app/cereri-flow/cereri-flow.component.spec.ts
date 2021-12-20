import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CereriFlowComponent } from './cereri-flow.component';

describe('CereriFlowComponent', () => {
  let component: CereriFlowComponent;
  let fixture: ComponentFixture<CereriFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CereriFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CereriFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
