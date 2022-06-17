import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CereriAdminSearchComponent } from './cereri-admin-search.component';

describe('CereriAdminSearchComponent', () => {
  let component: CereriAdminSearchComponent;
  let fixture: ComponentFixture<CereriAdminSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CereriAdminSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CereriAdminSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
