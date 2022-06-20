import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsArchievedComponent } from './es-archieved.component';

describe('EsArchievedComponent', () => {
  let component: EsArchievedComponent;
  let fixture: ComponentFixture<EsArchievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsArchievedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsArchievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
