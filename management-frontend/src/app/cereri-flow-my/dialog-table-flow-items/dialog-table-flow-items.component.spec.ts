import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTableFlowItemsComponent } from './dialog-table-flow-items.component';

describe('DialogTableFlowItemsComponent', () => {
  let component: DialogTableFlowItemsComponent;
  let fixture: ComponentFixture<DialogTableFlowItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTableFlowItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTableFlowItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
