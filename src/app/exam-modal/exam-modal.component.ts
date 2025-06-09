import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/services/Course.service';
import { QuestionModalComponent } from '../question-modal/question-modal.component';

@Component({
  selector: 'app-exam-modal',
  templateUrl: './exam-modal.component.html',
  styleUrls: ['./exam-modal.component.css']
})
export class ExamModalComponent implements OnInit {
  form!: FormGroup;
  exam?: any;
  courseId: number;

  constructor(
    private dialogRef: MatDialogRef<ExamModalComponent>,
    private courseService: CourseService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.courseId = data.courseId;
    if (data.examId) {
      this.courseService.getExamById(data.examId).subscribe(exam => {
        this.exam = exam;
        this.form.patchValue({
          id: exam.id,
          description: exam.description,
          cours_id: exam.cours_id
        });
      });
    } else {
      this.form = this.fb.group({
        id: [null],
        description: ['', Validators.required],
        cours_id: [this.courseId]
      });
    }
  }

  ngOnInit(): void {
    if (!this.exam) {
      this.form = this.fb.group({
        id: [null],
        description: ['', Validators.required],
        cours_id: [this.courseId]
      });
    }
  }

  save(): void {
    if (this.form.valid) {
      const examData = this.form.value;
      if (examData.id) {
        this.courseService.updateExam(examData.id, examData).subscribe(() => this.dialogRef.close());
      } else {
        this.courseService.addExam(examData).subscribe(() => this.dialogRef.close());
      }
    }
  }

  openQuestion(): void {
    const dialogRef = this.dialog.open(QuestionModalComponent, { width: '500px', data: { examId: this.exam?.id || null } });
    dialogRef.afterClosed().subscribe(() => {
      if (this.exam?.id) this.courseService.getExamById(this.exam.id).subscribe(updatedExam => this.exam = updatedExam);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}