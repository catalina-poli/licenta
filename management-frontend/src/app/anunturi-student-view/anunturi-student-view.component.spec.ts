import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunturiStudentViewComponent } from './anunturi-student-view.component';

describe('AnunturiStudentViewComponent', () => {
  let component: AnunturiStudentViewComponent;
  let fixture: ComponentFixture<AnunturiStudentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnunturiStudentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnunturiStudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
