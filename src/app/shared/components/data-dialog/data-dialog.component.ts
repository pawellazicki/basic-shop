import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'app-data-dialog',
  templateUrl: './data-dialog.component.html',
  styleUrls: ['./data-dialog.component.scss']
})
export class DataDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
