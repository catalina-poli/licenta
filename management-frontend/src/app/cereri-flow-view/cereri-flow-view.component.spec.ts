import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CereriFlowViewComponent } from './cereri-flow-view.component';

describe('CereriFlowViewComponent', () => {
  let component: CereriFlowViewComponent;
  let fixture: ComponentFixture<CereriFlowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CereriFlowViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CereriFlowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
