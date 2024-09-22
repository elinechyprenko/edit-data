import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeriodicElement } from './periodic-element';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from "./table/table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'table';
}
