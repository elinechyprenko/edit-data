import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEditComponent } from './table-edit.component';

describe('TableEditComponent', () => {
  let component: TableEditComponent;
  let fixture: ComponentFixture<TableEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
