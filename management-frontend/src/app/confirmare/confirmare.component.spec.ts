import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmareComponent } from './confirmare.component';

describe('ConfirmareComponent', () => {
  let component: ConfirmareComponent;
  let fixture: ComponentFixture<ConfirmareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
