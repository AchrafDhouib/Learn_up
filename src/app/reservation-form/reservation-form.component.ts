import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/models/Reservation.model';
import { AuthServiceService } from 'src/services/auth-service.service';
import { ReservationService } from 'src/services/reservations.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservation: Reservation = {
    client_id: 0,
    chambre_id: 0,
    date_debut: new Date(),
    date_fin: new Date(),
    status: 'en_attente'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const chambreId = Number(this.route.snapshot.queryParamMap.get('chambreId'));
    const clientId = this.authService.getUserId();

    if (chambreId) {
      this.reservation.chambre_id = chambreId;
    }

    if (clientId) {
      this.reservation.client_id = parseInt(clientId);
    }

    console.log('Réservation préparée :', this.reservation);
  }

  submitReservation() {
    // Vérification des dates
    if (new Date(this.reservation.date_fin) <= new Date(this.reservation.date_debut)) {
      alert("La date de fin doit être après la date de début.");
      return;
    }

    this.reservationService.createReservation(this.reservation).subscribe({
      next: (res) => {
        alert('Réservation effectuée avec succès !');
        console.log(res);
        this.router.navigate(['/mes-reservation']); // redirection optionnelle
      },
      error: (err) => {
        console.error('Erreur lors de la réservation :', err);
        alert(err.error?.message || 'Erreur lors de la réservation.');
      }
    });
  }
}
