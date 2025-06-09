import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/services/Course.service';
import { AnswerModalComponent } from '../answer-modal/answer-modal.component';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css']
})
export class QuestionModalComponent implements OnInit {
  form!: FormGroup;
  questionTypes = ['unique_choice', 'multiple_choice'];
  examId: number;

  constructor(
    private dialogRef: MatDialogRef<QuestionModalComponent>,
    private courseService: CourseService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.examId = data.examId || null;
    if (data.questionId) {
      this.courseService.getExamById(this.examId).subscribe(exam => {
        const question = exam?.questions?.find(q => q.id === data.questionId);
        if (question) {
          this.form.patchValue({
            id: question.id,
            question: question.question,
            type: question.type,
            exams_id: this.examId
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      question: ['', Validators.required],
      type: ['unique_choice', Validators.required],
      exams_id: [this.examId]
    });
  }

  save(): void {
    if (this.form.valid) {
      const questionData = this.form.value;
      if (questionData.id) {
        this.courseService.updateQuestion(questionData.id, questionData).subscribe(() => this.dialogRef.close());
      } else {
        this.courseService.addQuestion(questionData).subscribe(() => this.dialogRef.close());
      }
    }
  }

  openAnswer(): void {
    const dialogRef = this.dialog.open(AnswerModalComponent, { width: '400px', data: { questionId: this.form.value.id || null } });
    dialogRef.afterClosed().subscribe(() => {
      if (this.examId) this.courseService.getExamById(this.examId).subscribe();
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}