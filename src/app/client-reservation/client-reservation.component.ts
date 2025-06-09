import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/models/Reservation.model';
import { AuthServiceService } from 'src/services/auth-service.service';
import { ReservationService } from 'src/services/reservations.service';

@Component({
  selector: 'app-client-reservation',
  templateUrl: './client-reservation.component.html',
  styleUrls: ['./client-reservation.component.css']
})
export class ClientReservationComponent implements OnInit {
  reservations: any[] = [];
  userName: string | null = ''; // Déclarez la variable pour le nom de l'utilisateur


  constructor(
    private reservationService: ReservationService,
    private authService: AuthServiceService // Injecter le service Auth
  ) { }

  ngOnInit(): void {
    this.getClientReservations(); // Appel de la méthode pour charger les réservations du client connecté
    this.userName = this.authService.getUserName(); // Récupérer le nom de l'utilisateur connecté

  }

  getClientReservations(): void {
    const clientId = this.authService.getUserId(); // Récupérer l'ID du client connecté

    if (clientId) {
      this.reservationService.getReservationsByUser(Number(clientId)).subscribe(
        (data) => {
          this.reservations = data; // Les réservations filtrées pour le client
        },
        (error) => {
          console.error('Erreur lors de la récupération des réservations', error);
        }
      );
    }
  }

  // Fonction pour confirmer une réservation
  confirmReservation(id: number): void {
    this.reservationService.confirmReservation(id).subscribe(
      (response) => {
        console.log('Réservation confirmée avec succès');
        this.getClientReservations(); // Recharger les réservations après confirmation
      },
      (error) => {
        console.error('Erreur lors de la confirmation de la réservation', error);
      }
    );
  }

  // Fonction pour annuler une réservation
  cancelReservation(id: number): void {
    this.reservationService.cancelReservation(id).subscribe(
      (response) => {
        console.log('Réservation annulée avec succès');
        this.getClientReservations(); // Recharger les réservations après annulation
      },
      (error) => {
        console.error('Erreur lors de l\'annulation de la réservation', error);
      }
    );
  }
}