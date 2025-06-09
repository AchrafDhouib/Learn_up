import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Discipline } from 'src/models/Discipline.model';
import { DisciplineService } from 'src/services/discipline.service';
import { DisciplineModalComponent } from '../discipline-modal/discipline-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css']
})
export class DisciplineComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'image', 'actions'];
  dataSource = new MatTableDataSource<Discipline>();

  constructor(private disciplineService: DisciplineService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.disciplineService.getAllDisciplines().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(DisciplineModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.disciplineService.addDiscipline(result).subscribe(() => {
          this.disciplineService.getAllDisciplines().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

  openEdit(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(DisciplineModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.disciplineService.updateDiscipline(id, result).subscribe(() => {
          this.disciplineService.getAllDisciplines().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.disciplineService.deleteDiscipline(id).subscribe(() => {
          this.disciplineService.getAllDisciplines().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }
}