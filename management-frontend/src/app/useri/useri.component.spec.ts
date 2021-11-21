import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseriComponent } from './useri.component';

describe('UseriComponent', () => {
  let component: UseriComponent;
  let fixture: ComponentFixture<UseriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
