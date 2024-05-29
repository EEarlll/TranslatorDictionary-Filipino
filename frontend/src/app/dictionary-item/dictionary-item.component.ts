import { Component, Input, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Dictionary } from '../dictionary';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'app-dictionary-item',
  standalone: true,
  imports: [MatDividerModule, MatCardModule],
  templateUrl: './dictionary-item.component.html',
  styleUrl: './dictionary-item.component.scss',
})
export class DictionaryItemComponent {
  @Input() dict!: Dictionary;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DictionaryItemDialog);
    let instance = dialogRef.componentInstance;
    instance.item = this.dict;

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog Result: ${result}`);
    });
  }
}

@Component({
  selector: 'dictionary-item-dialog',
  templateUrl: 'dictionary-item-dialog.html',
  styleUrl: 'dictionary-item-dialog.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class DictionaryItemDialog {
  @Input() item!: Dictionary;
  dictionaryService = inject(DictionaryService);
  applyForm!: FormGroup;

  ngOnInit(): void {
    this.applyForm = new FormGroup({
      id: new FormControl(this.item.id),
      example: new FormControl(''),
      created_by: new FormControl(''),
    });
  }

  submitApplication() {
    this.dictionaryService
      .PutExample(
        this.applyForm.value.id ?? 0,
        this.applyForm.value.example ?? '',
        this.applyForm.value.created_by ?? ''
      )
      .then(() => {
        window.location.reload();
      }); 
  }
}
