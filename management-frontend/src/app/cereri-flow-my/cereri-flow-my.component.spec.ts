import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CereriFlowMyComponent } from './cereri-flow-my.component';

describe('CereriFlowMyComponent', () => {
  let component: CereriFlowMyComponent;
  let fixture: ComponentFixture<CereriFlowMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CereriFlowMyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CereriFlowMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
