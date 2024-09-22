import { Component, Inject } from '@angular/core';
import { rxState, RxState } from '@rx-angular/state';
import { PeriodicElement } from '../periodic-element';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table-edit',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  providers: [RxState],
  templateUrl: './table-edit.component.html',
  styleUrl: './table-edit.component.scss'
})
export class TableEditComponent {

  editForm: FormGroup | any = '';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TableEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) { }


  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm() {
    this.editForm = this.fb.group({
      position: this.data.position,
      name: this.data.name,
      weight: this.data.weight,
      symbol: this.data.symbol,
    })
  }
  onSave(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }
  onCancel(): void {
    this.dialogRef.close()
  }
}
