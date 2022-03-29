import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCerereFormsComponent } from './add-cerere-forms.component';

describe('AddCerereFormsComponent', () => {
  let component: AddCerereFormsComponent;
  let fixture: ComponentFixture<AddCerereFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCerereFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCerereFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
