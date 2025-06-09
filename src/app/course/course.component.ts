import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/models/Course.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CourseService } from 'src/services/Course.service';
import { CourseModalComponent } from '../course-modal/course-modal.component';
import { ExamModalComponent } from '../exam-modal/exam-modal.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'speciality_name', 'creator_name', 'description', 'image', 'is_accepted', 'actions'];
  dataSource = new MatTableDataSource<Course>();

  constructor(private courseService: CourseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = event.target ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(CourseModalComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseService.addCourse(result).subscribe(() => {
          this.courseService.getAllCourses().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

  openEdit(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id };
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(CourseModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseService.updateCourse(id, result).subscribe(() => {
          this.courseService.getAllCourses().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

  openExam(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { courseId: id };
    dialogConfig.width = '500px';
    this.dialog.open(ExamModalComponent, dialogConfig);
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseService.deleteCourse(id).subscribe(() => {
          this.courseService.getAllCourses().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

  acceptCourse(id: number): void {
    this.courseService.acceptCourse(id).subscribe(() => {
      this.courseService.getAllCourses().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }

  rejectCourse(id: number): void {
    this.courseService.rejectCourse(id).subscribe(() => {
      this.courseService.getAllCourses().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}