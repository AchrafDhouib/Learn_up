import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, registerables } from 'chart.js';

import { HotelsService } from 'src/services/hotels.service';
import { ReservationService } from 'src/services/reservations.service';
import { UserService } from 'src/services/user.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { DisciplineService } from 'src/services/discipline.service';
import { SpecialityService } from 'src/services/speciality.service';
import { CourseService } from 'src/services/Course.service';
import { Discipline } from 'src/models/Discipline.model';
import { Speciality } from 'src/models/Speciality.model';
import { User } from 'src/models/User.model';
import { Course } from 'src/models/Course.model';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Totals
  nbDisciplines: number = 0;
  nbSpecialities: number = 0;
  nbUsers: number = 0;
  nbActiveUsers: number = 0;
  nbInactiveUsers: number = 0;
  nbTeachers: number = 0;
  nbStudents: number = 0;
  nbCourses: number = 0;

  // Store fetched disciplines
  private disciplines: Discipline[] = [];

  // Chart Data
  chartDataPie: ChartDataset[] = [{ label: 'User Status', data: [0, 0] }];
  chartLabelsPie: string[] = ['Active Users', 'Inactive Users'];

  chartDataBar: ChartDataset[] = [{ label: 'Users by Role', data: [0, 0] }];
  chartLabelsBar: string[] = ['Teachers', 'Students'];

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: { legend: { position: 'top' } }
  };

  isLoading: boolean = true;

  constructor(
    private disciplineService: DisciplineService,
    private specialityService: SpecialityService,
    private userService: UserService,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Fetch Disciplines
    this.disciplineService.getAllDisciplines().subscribe((disciplines: Discipline[]) => {
      this.disciplines = disciplines;
      this.nbDisciplines = disciplines.length;
    });

    // Fetch Specialities
    this.specialityService.getAllSpecialities().subscribe((specialities: Speciality[]) => {
      this.nbSpecialities = specialities.length;
    });

    // Fetch Users
    this.userService.getUsers().subscribe((users: User[]) => {
      this.nbUsers = users.length;
      this.nbActiveUsers = users.filter(u => u.is_active === 1).length;
      this.nbInactiveUsers = users.filter(u => u.is_active === 0).length;
      this.nbTeachers = users.filter(u => u.roles.includes('teacher')).length;
      this.nbStudents = users.filter(u => u.roles.includes('student')).length;

      // Update Charts
      this.chartDataPie = [{ label: 'User Status', data: [this.nbActiveUsers, this.nbInactiveUsers] }];
      this.chartDataBar = [{ label: 'Users by Role', data: [this.nbTeachers, this.nbStudents] }];
      this.isLoading = false;
      this.cdr.detectChanges();
    });

    // Fetch Courses
    this.courseService.getAllCourses().subscribe((courses: Course[]) => {
      this.nbCourses = courses.length;
      this.cdr.detectChanges();
    });
  }
}