import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCerereComponent } from './add-cerere.component';

describe('AddCerereComponent', () => {
  let component: AddCerereComponent;
  let fixture: ComponentFixture<AddCerereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCerereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCerereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
