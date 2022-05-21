import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CereriFlowViewDialogComponent } from './cereri-flow-view-dialog.component';

describe('CereriFlowViewDialogComponent', () => {
  let component: CereriFlowViewDialogComponent;
  let fixture: ComponentFixture<CereriFlowViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CereriFlowViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CereriFlowViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
