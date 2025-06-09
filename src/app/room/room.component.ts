import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/services/reservations.service';
import { RoomsService } from 'src/services/rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  chambres: any[] = [];
  offres: any[] = [];
  //offres: Offre[] = [];
  filteredChambres: any[] = [];
  chambreTypes: string[] = [];
  selectedType: string = '';
  selectedAvailability: boolean | null = null;

  hotelId!: number;
  hotelName: string = '';
  hotelOffers: string = '';//offre

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private RoomService:RoomsService
  ) {}

  ngOnInit(): void {
    // this.hotelId = +this.route.snapshot.paramMap.get('id')!;
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.hotelId = +idParam;
      this.loadHotelRooms();
    } else {
      console.error("Aucun ID d’hôtel fourni dans l’URL.");
    }

  }


  loadHotelRooms() {
    this.RoomService.getHotelWithRooms(this.hotelId).subscribe({
      next: (response) => {
        if (response.success && response.hotel) {
          this.hotelName = response.hotel.nom;
          this.chambres = response.hotel.chambres;

          // Ajout des offres :
          // this.offres = response.hotel.offres || [];
          this.offres = response.hotel.offre ? [response.hotel.offre] : [];
console.log(response)
          // Extraction des types de chambre
          this.chambreTypes = [...new Set(this.chambres.map(c => c.type_chambre))];
          this.selectedType = this.chambreTypes[0];
          this.filterChambres();
        }
      },
      error: (err) => {
        console.error('Erreur de chargement des chambres de l’hôtel', err);
      }
    });
  }




  onChangeType(type: string): void {
    this.selectedType = type;
    this.filterChambres();
  }

  // onChangeType(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const selectedValue = selectElement.value;
  //   this.selectedType = selectedValue;
  //   this.filterChambres();
  // }




  // onChangeAvailability(event: any): void {
  //   this.selectedAvailability = event.target.value !== '' ? Boolean(parseInt(event.target.value)) : null;
  //   this.filterChambres();
  // }

  onChangeAvailability(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.selectedAvailability = value !== '' ? Boolean(parseInt(value)) : null;
    this.filterChambres();
  }



  filterChambres(): void {
    this.filteredChambres = this.chambres.filter(c => {
      const typeMatch = this.selectedType ? c.type_chambre === this.selectedType : true;
      const availabilityMatch = this.selectedAvailability !== null
        ? c.disponibilite === this.selectedAvailability
        : true;

      return typeMatch && availabilityMatch;
    });
  }

  getStars(count: number): any[] {
    return Array(count).fill(0);
  }
  getRoomTypeIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'standard': 'fas fa-bed',
      'deluxe': 'fas fa-bed fa-lg',
      'suite': 'fas fa-couch',
      'familiale': 'fas fa-home',
      'executive': 'fas fa-star'
    };
    return icons[type.toLowerCase()] || 'fas fa-bed';
  }


}

