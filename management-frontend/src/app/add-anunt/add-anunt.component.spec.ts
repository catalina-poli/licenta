import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnuntComponent } from './add-anunt.component';

describe('AddAnuntComponent', () => {
  let component: AddAnuntComponent;
  let fixture: ComponentFixture<AddAnuntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnuntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
