import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre } from 'src/models/Offre.model';
import { HotelsService } from 'src/services/hotels.service';
import { OffreService } from 'src/services/offre.service';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {
  hotelId!: number;
  hotelNom: string = ''; 


  offre: Offre = {
    titre: '',
    description: '',
    valeur_remise: 0,
    date_fin_promo: '',
    hotel_id: 0
  };

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService,
    private hotelService: HotelsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.offre.hotel_id = this.hotelId;
    this.getHotelDetails(); 

  }

  getHotelDetails(): void {
    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (data) => {
        if (data.success) {
          this.hotelNom = data.hotel.nom; 
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de l\'hôtel:', err);
      }
    });
  }

  submitOffre() {
    this.offreService.ajouterOffre(this.offre).subscribe({
      next: () => {
        alert('Offre ajoutée avec succès !');
        this.router.navigate(['/ListHotelAdmin']); // redirection après ajout
      },
      error: (err) => console.error('Erreur lors de l’ajout de l’offre :', err)
    });
  }
}