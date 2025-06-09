import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Discipline } from 'src/models/Discipline.model';
import { DisciplineService } from 'src/services/discipline.service';

@Component({
  selector: 'app-discipline-modal',
  templateUrl: './discipline-modal.component.html',
  styleUrls: ['./discipline-modal.component.css']
})
export class DisciplineModalComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DisciplineModalComponent>,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    if (data) {
      this.disciplineService.getDisciplineById(data).subscribe((discipline: Discipline) => {
        this.form.patchValue({
          id: discipline.id,
          name: discipline.name,
          description: discipline.description,
          image: discipline.image
        });
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}