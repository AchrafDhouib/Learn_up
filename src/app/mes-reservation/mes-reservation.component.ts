import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/services/reservations.service';

@Component({
  selector: 'app-mes-reservation',
  templateUrl: './mes-reservation.component.html',
  styleUrls: ['./mes-reservation.component.css']
})
export class MesReservationComponent  implements OnInit {
  reservations: any[] = [];
  searchText: string = '';  // Variable pour la recherche


  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des réservations', error);
      }
    );
  }


  // Function to confirm a reservation
  confirmReservation(id: number): void {
    this.reservationService.confirmReservation(id).subscribe(
      (response) => {
        console.log('Réservation confirmée avec succès');
        this.getAllReservations(); // Reload the reservations after confirmation
      },
      (error) => {
        console.error('Erreur lors de la confirmation de la réservation', error);
      }
    );
  }

  // Function to cancel a reservation
  cancelReservation(id: number): void {
    this.reservationService.cancelReservation(id).subscribe(
      (response) => {
        console.log('Réservation annulée avec succès');
        this.getAllReservations(); // Reload the reservations after cancellation
      },
      (error) => {
        console.error('Erreur lors de l\'annulation de la réservation', error);
      }
    );
  }

  getStatusStyle(status: string): any {
    switch (status) {
      case 'confirmee':
        return { backgroundColor: '#458f45', color: 'white' };
      case 'en_attente':
        return { backgroundColor: '#9b9b9b', color: '#212529' };
      case 'annulee':
        return { backgroundColor: '#5c0000', color: 'white' };
      default:
        return { backgroundColor: '#5c0000', color: 'white' }; // gris pour statut inconnu
    }
  }
}