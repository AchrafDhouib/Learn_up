import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SpecialityService } from 'src/services/speciality.service';
import { Speciality } from 'src/models/Speciality.model';
import { SpecialityModalComponent } from '../speciality-modal/speciality-modal.component';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css']
})
export class SpecialityComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'discipline_name', 'description', 'image', 'actions'];
  dataSource = new MatTableDataSource<Speciality>();

  constructor(private specialityService: SpecialityService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.specialityService.getAllSpecialities().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = event.target ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(SpecialityModalComponent, {
      width: '400px',
      data: { disciplines: [] } // Placeholder, will be populated in modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.specialityService.addSpeciality(result).subscribe(() => {
          this.specialityService.getAllSpecialities().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

  openEdit(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id, disciplines: [] }; // Placeholder
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(SpecialityModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.specialityService.updateSpeciality(id, result).subscribe(() => {
          this.specialityService.getAllSpecialities().subscribe((data) => {
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
        this.specialityService.deleteSpeciality(id).subscribe(() => {
          this.specialityService.getAllSpecialities().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }
}