import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CereriFlowMyStatusDialogComponent } from './cereri-flow-my-status-dialog.component';

describe('CereriFlowMyStatusDialogComponent', () => {
  let component: CereriFlowMyStatusDialogComponent;
  let fixture: ComponentFixture<CereriFlowMyStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CereriFlowMyStatusDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CereriFlowMyStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
