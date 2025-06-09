import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel, HotelResponse } from 'src/models/Hotel.model';
import { Offre } from 'src/models/Offre.model';
import { HotelsService } from 'src/services/hotels.service';
import { OffreService } from 'src/services/offre.service';
declare var bootstrap: any;


@Component({
  selector: 'app-hotel-list-admin',
  templateUrl: './hotel-list-admin.component.html',
  styleUrls: ['./hotel-list-admin.component.css']
})
export class HotelListAdminComponent implements  OnInit {
  hotels: Hotel[] = [];
  searchText: string = '';  // Variable pour la recherche
//offre
offreErrorMessage: string = '';

selectedOffre: any = null;

//
  newHotel: Hotel = {
    nom: '',
    ville: '',
    description: '',
    nbre_etoiles: '',
    image_hotel: '',
    equipements: []
  };

// Offre
selectedHotelIdForOffer!: number;
hotelNom: string = '';
offre: Offre = {
  titre: '',
  description: '',
  valeur_remise: 0,
  date_fin_promo: '',
  hotel_id: 0
};


  editMode: boolean = false;
  editedHotelId: number | null = null;

  constructor(private hotelService: HotelsService ,private route: ActivatedRoute,
    private offreService: OffreService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getAllHotel().subscribe((res: HotelResponse) => {
      if (res && res.hotels && Array.isArray(res.hotels)) {
        this.hotels = res.hotels;
        this.hotels.forEach(hotel => {
          this.offreService.hasOffer(hotel.id!).subscribe(response => {
            hotel.hasOffer = response.has_offer === 'oui';
          }, () => {
            hotel.hasOffer = false;
          });
        });
      } else {
        this.hotels = [];
      }
    });
  }
//offre


//
  // 🔍 Filtrage
  filteredClients(): Hotel[] {
    return this.hotels.filter(hotel =>
      hotel.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      hotel.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
      hotel.ville.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  showOfferDetails(hotelId: number): void {
    this.offreService.getOfferForHotel(hotelId).subscribe({
      next: (response) => {
        this.selectedOffre = response.offre;
        const modal = new bootstrap.Modal(document.getElementById('offreDetailsModal')!);
        modal.show();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails de l\'offre', err);
      }
    });
  }

  // 🏨 Hôtel : ajout / édition
  openModalForAdd() {
    this.editMode = false;
    this.resetForm();
    const modal = new bootstrap.Modal(document.getElementById('hotelModal')!);
    modal.show();
  }

  editHotel(hotel: Hotel) {
    this.editMode = true;
    this.editedHotelId = hotel.id!;
    this.newHotel = { ...hotel };
    const modal = new bootstrap.Modal(document.getElementById('hotelModal')!);
    modal.show();
  }

  saveHotel() {
    const saveObs = this.editMode && this.editedHotelId !== null
      ? this.hotelService.updateHotel(this.editedHotelId, this.newHotel)
      : this.hotelService.addHotel(this.newHotel);

    saveObs.subscribe(() => {
      this.loadHotels();
      this.resetForm();
    });

    bootstrap.Modal.getInstance(document.getElementById('hotelModal')!)?.hide();
  }

  deleteHotel(id: number) {
    this.hotelService.deleteHotel(id).subscribe(() => {
      this.loadHotels();
    });
  }

  resetForm() {
    this.newHotel = {
      nom: '',
      ville: '',
      description: '',
      nbre_etoiles: '',
      image_hotel: '',
      equipements: []
    };
    this.editMode = false;
    this.editedHotelId = null;
  }

  // 🎁 Offre : ajout via modale
  openModalForAddOffer(hotelId: number, nom: string) {
    this.selectedHotelIdForOffer = hotelId;
    this.hotelNom = nom;
    this.offre = {
      titre: '',
      description: '',
      valeur_remise: 0,
      date_fin_promo: '',
      hotel_id: hotelId
    };
    const modal = new bootstrap.Modal(document.getElementById('offreModal')!);
    modal.show();
  }

  submitOffre() {
    this.offreService.ajouterOffre(this.offre).subscribe({
      next: () => {
        alert('Offre ajoutée avec succès !');
        this.loadHotels();
        bootstrap.Modal.getInstance(document.getElementById('offreModal')!)?.hide();
      },
      error: (err) => {
        if (err.status === 409) {
          alert('⚠️ Cet hôtel a déjà une offre active.');
        } else if (err.status === 422 && err.error.errors) {
          // Afficher les erreurs de validation
          const messages = Object.values(err.error.errors).flat().join('\n');
          alert('Erreurs de validation :\n' + messages);
        } else {
          alert("Erreur lors de l’ajout de l’offre. Veuillez réessayer.");
        }
      }
    });
  }
// error: (err) => {
//   if (err.status === 409) {
//     this.offreErrorMessage = 'Cet hôtel a déjà une offre active.';
//   } else if (err.status === 422 && err.error.errors) {
//     this.offreErrorMessage = Object.values(err.error.errors).flat().join('\n');
//   } else {
//     this.offreErrorMessage = "Erreur lors de l’ajout de l’offre.";
//   }
// }


}