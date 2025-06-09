import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HotelComponent } from './hotel/hotel.component';
import { RoomComponent } from './room/room.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './auth.interceptor';
import { MesReservationComponent } from './mes-reservation/mes-reservation.component';
// import { ConfirmCommentaireComponent } from './confirm-commentaire/confirm-commentaire.component';
import { HotelListAdminComponent } from './hotel-list-admin/hotel-list-admin.component';
import { UserListAdminComponent } from './user-list-admin/user-list-admin.component';
import { ClientReservationComponent } from './client-reservation/client-reservation.component';
import { HeaderClientComponent } from './header-client/header-client.component';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { RoomListAdminComponent } from './room-list-admin/room-list-admin.component';
import { ChambresListAdminComponent } from './chambres-list-admin/chambres-list-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatNativeDateModule } from '@angular/material/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
// import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {MatCardModule} from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { DisciplineModalComponent } from './discipline-modal/discipline-modal.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { SpecialityModalComponent } from './speciality-modal/speciality-modal.component';
import { CourseComponent } from './course/course.component';
import { CourseModalComponent } from './course-modal/course-modal.component';
import { ExamModalComponent } from './exam-modal/exam-modal.component';
import { QuestionModalComponent } from './question-modal/question-modal.component';
import { AnswerModalComponent } from './answer-modal/answer-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HotelComponent,
    RoomComponent,
    ReservationFormComponent,
    FacilitiesComponent,
    MesReservationComponent,
    // ConfirmCommentaireComponent,
    HotelListAdminComponent,
    UserListAdminComponent,
    ClientReservationComponent,
    HeaderClientComponent,
    AddOffreComponent,
    RoomListAdminComponent,
    ChambresListAdminComponent,
    DashboardComponent,

     SideBarComponent,
     DisciplineComponent,
     DisciplineModalComponent,
     ConfirmDialogComponent,
     SpecialityComponent,
     SpecialityModalComponent,
     CourseComponent,
     CourseModalComponent,
     ExamModalComponent,
     QuestionModalComponent,
     AnswerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatCardModule,
    NgChartsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
