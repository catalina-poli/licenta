import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunturiStudentComponent } from './anunturi-student.component';

describe('AnunturiStudentComponent', () => {
  let component: AnunturiStudentComponent;
  let fixture: ComponentFixture<AnunturiStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnunturiStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnunturiStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
