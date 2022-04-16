import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnuntDocumentComponent } from './add-anunt-document.component';

describe('AddAnuntDocumentComponent', () => {
  let component: AddAnuntDocumentComponent;
  let fixture: ComponentFixture<AddAnuntDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnuntDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnuntDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
