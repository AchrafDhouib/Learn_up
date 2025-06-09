import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Speciality } from 'src/models/Speciality.model';
import { SpecialityService } from 'src/services/speciality.service';

@Component({
  selector: 'app-speciality-modal',
  templateUrl: './speciality-modal.component.html',
  styleUrls: ['./speciality-modal.component.css']
})
export class SpecialityModalComponent implements OnInit {
  form!: FormGroup;
  disciplines: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<SpecialityModalComponent>,
    private specialityService: SpecialityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    if (data && data.id) {
      this.specialityService.getSpecialityById(data.id).subscribe((speciality: Speciality) => {
        this.form.patchValue({
          id: speciality.id,
          name: speciality.name,
          discipline_id: speciality.discipline_id,
          description: speciality.description,
          image: speciality.image
        });
      });
    }
    this.specialityService.getAllDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines;
      if (data && data.disciplines.length === 0) {
        data.disciplines = disciplines; // Populate disciplines if empty
      }
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      discipline_id: ['', Validators.required],
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