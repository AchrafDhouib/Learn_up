import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { HotelComponent } from './hotel/hotel.component';
import { RoomComponent } from './room/room.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { MesReservationComponent } from './mes-reservation/mes-reservation.component';
// import { ConfirmCommentaireComponent } from './confirm-commentaire/confirm-commentaire.component';
import { HotelListAdminComponent } from './hotel-list-admin/hotel-list-admin.component';
import { UserListAdminComponent } from './user-list-admin/user-list-admin.component';
import { ClientReservationComponent } from './client-reservation/client-reservation.component';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { RoomListAdminComponent } from './room-list-admin/room-list-admin.component';
import { ChambresListAdminComponent } from './chambres-list-admin/chambres-list-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },

  {
    path: 'Disciplines',
    pathMatch: 'full',
    component:  DisciplineComponent,
    canActivate : [AuthGuard]
  },

  {
    path: 'Specialities',
    pathMatch: 'full',
    component:  SpecialityComponent,
    canActivate : [AuthGuard]
  },

    {
    path: 'Courses',
    pathMatch: 'full',
    component:  CourseComponent,
    canActivate : [AuthGuard]
  },

  {
    path: 'rooms/:id',
    pathMatch: 'full',
    component: RoomComponent ,
   // canActivate : [AuthGuard]
  },
  {
    path: 'cours',
    pathMatch: 'full',
    component: HotelComponent ,
    //canActivate : [AuthGuard]

  },

  { 
    path: 'formulairereservation',
    pathMatch: 'full',
    component: ReservationFormComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'ListReservationAdmin',
    pathMatch: 'full',
    component: MesReservationComponent,
    canActivate : [AuthGuard]
  },
  // {
  //   path: 'ConfirmCommentaires',
  //   pathMatch: 'full',
  //   component: ConfirmCommentaireComponent,
  //   canActivate : [AuthGuard]
  // },
  {
    path: 'ListHotelAdmin',
    pathMatch: 'full',
    component: HotelListAdminComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'ListUserAdmin',
    pathMatch: 'full',
    component: UserListAdminComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'packs',
    pathMatch: 'full',
    component: ClientReservationComponent,
    canActivate : [AuthGuard]

  },
  {
    path: 'addoffre/:hotelId',
    component: AddOffreComponent
  },
  // {  rahma
  //   path: 'List-hotel-chambre/:id',
  //   pathMatch: 'full',
  //   component: RoomListAdminComponent,
  //   canActivate : [AuthGuard]
  // },

  {
    path: 'List-hotel-chambre/:id',
    pathMatch: 'full',
    component: ChambresListAdminComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'Dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate : [AuthGuard]
  },

  {
    path: 'facilities',
    pathMatch: 'full',
    component: FacilitiesComponent ,
    canActivate : [AuthGuard]

  },
  {
    path: 'register',
    pathMatch: 'full',
    component: LoginComponent
  },
  { path: '**',
     redirectTo: 'home' 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
