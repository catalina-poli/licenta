import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentsDialogComponent } from './view-students-dialog.component';

describe('ViewStudentsDialogComponent', () => {
  let component: ViewStudentsDialogComponent;
  let fixture: ComponentFixture<ViewStudentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
