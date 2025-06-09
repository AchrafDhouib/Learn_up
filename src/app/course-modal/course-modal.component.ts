import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from 'src/services/Course.service';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent implements OnInit {
  form!: FormGroup;
  specialities: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<CourseModalComponent>,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    if (data && data.id) {
      this.courseService.getCourseById(data.id).subscribe((course) => {
        this.form.patchValue({
          id: course.id,
          name: course.name,
          cours_url: course.cours_url,
          speciality_id: course.speciality_id,
          creator_id: course.creator_id,
          description: course.description,
          image: course.image
        });
      });
    }
    this.courseService.getAllCourses().subscribe((courses) => {
      this.specialities = courses
        .map(c => c.speciality)
        .filter((s): s is NonNullable<any> => s !== undefined && s !== null)
        .reduce((unique, item) => 
          unique.some((u: { id: number }) => u.id === item.id) ? unique : [...unique, item], []);
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      cours_url: [''],
      speciality_id: ['', Validators.required],
      creator_id: ['', Validators.required],
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