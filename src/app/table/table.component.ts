import { Component } from '@angular/core';
import { PeriodicElement, TableState } from '../periodic-element';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxState } from '@rx-angular/state';
import { MatButtonModule } from '@angular/material/button';
import { TableEditComponent } from '../table-edit/table-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { delay, of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatFormFieldModule, FormsModule,
    TableEditComponent, MatDialogModule, ReactiveFormsModule, MatInputModule],
  providers: [RxState],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
  dataSource = ELEMENT_DATA;
  filteredData$;
  filterControl = new FormControl('');

  constructor(private dialog: MatDialog, public state: RxState<TableState>) {
    this.filteredData$ = this.state.select('filteredData');
  }

  ngOnInit(): void {
    this.state.set({
      data: ELEMENT_DATA,
      filteredData: ELEMENT_DATA,
      filter: ''
    })

    of(ELEMENT_DATA)
      .pipe(delay(2000))
      .subscribe(data => this.state.set({ data, filteredData: data }));
    this.state.select('filter').subscribe(filter => {
      this.filterData(filter);
      const filteredData = this.filterData(filter);
      this.state.set({ filteredData });
    }
    );
  }

  filterData(filterValue: string): PeriodicElement[] {
    const lowerCaseFilter = filterValue.trim().toLowerCase();
    return this.state.get().data.filter((element: PeriodicElement) => {
      return Object.values(element).some(value =>
        value.toString().toLowerCase().includes(lowerCaseFilter)
      );
    });
  }

  editElement(element: PeriodicElement) {
    let dialogRef = this.dialog.open(TableEditComponent, {
      height: '300px',
      width: '500px',
      data: { ...element }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateElement(result);
      }
    });
  }

  private updateElement(updatedElement: PeriodicElement): void {
    const currentData = this.state.get().data;
    const updatedData = currentData.map(item =>
      item.position === updatedElement.position ? updatedElement : item
    );
    this.state.set({ data: updatedData, filteredData: updatedData });
  }
}
