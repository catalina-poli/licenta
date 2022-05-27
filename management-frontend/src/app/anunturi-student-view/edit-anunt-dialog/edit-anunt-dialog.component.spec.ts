import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnuntDialogComponent } from './edit-anunt-dialog.component';

describe('EditAnuntDialogComponent', () => {
  let component: EditAnuntDialogComponent;
  let fixture: ComponentFixture<EditAnuntDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnuntDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnuntDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
