import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from 'src/services/Course.service';

@Component({
  selector: 'app-answer-modal',
  templateUrl: './answer-modal.component.html',
  styleUrls: ['./answer-modal.component.css']
})
export class AnswerModalComponent implements OnInit {
  form!: FormGroup;
  questionId: number;

  constructor(
    private dialogRef: MatDialogRef<AnswerModalComponent>,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.questionId = data.questionId || null;
    if (data.answerId) {
      this.courseService.getExamById(this.questionId).subscribe(exam => {
        const question = exam?.questions?.find(q => q.id === this.questionId);
        if (question && question.answers) {
          const answer = question.answers.find(a => a.id === data.answerId);
          if (answer) {
            this.form.patchValue({
              id: answer.id,
              answer: answer.answer,
              is_correct: answer.is_correct,
              question_id: this.questionId
            });
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      answer: ['', Validators.required],
      is_correct: [false],
      question_id: [this.questionId]
    });
  }

  save(): void {
    if (this.form.valid) {
      const answerData = this.form.value;
      if (answerData.id) {
        this.courseService.updateAnswer(answerData.id, answerData).subscribe(() => this.dialogRef.close());
      } else {
        this.courseService.addAnswer(answerData).subscribe(() => this.dialogRef.close());
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}