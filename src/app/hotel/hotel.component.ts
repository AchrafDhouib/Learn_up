import { Component, OnInit } from '@angular/core';
import { Hotel, HotelResponse } from 'src/models/Hotel.model';
import { HotelsService } from 'src/services/hotels.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  hotels: Hotel[] = [];

  newHotel: Hotel = {
    nom: '',
    ville: '',
    description: '',
    nbre_etoiles: '',
    image_hotel:''
  };

  constructor(private hotelService: HotelsService) {}

ngOnInit(): void {
    this.hotelService.getAllHotel().subscribe((res: HotelResponse) => {
      console.log("Réponse de getAllHotel:", res);

      // Vérification explicite
      if (res && res.hotels && Array.isArray(res.hotels)) {
        this.hotels = res.hotels; // Extraire le tableau hotels
      } else {
        console.error("La réponse ne contient pas un tableau d'hôtels:", res);
        this.hotels = []; // Valeur par défaut sécurisée
      }
    });
  }
  loadHotels() {
    this.hotelService.getAllHotel().subscribe((response: any) => {
      console.log('Response from getAllHotel:', response);
      // Adapte selon la structure réelle de ton backend
      this.hotels = response.data?.hotels ?? [];// ← si la structure est data.hotels
    });
  }

  addHotel() {
    this.hotelService.addHotel(this.newHotel).subscribe(() => {
      this.loadHotels();
      this.newHotel = {
        nom: '',
        ville: '',
        description: '',
        nbre_etoiles: '',
        image_hotel:'',

      };
    });
  }

  deleteHotel(id: number) {
    this.hotelService.deleteHotel(id).subscribe(() => {
      this.loadHotels();
    });
  }
  filters: any = {
    nom: '',
    ville: '',
    nbre_etoiles: ''
  };

  applyFilters() {
    this.hotelService.filterHotels(this.filters).subscribe((res: HotelResponse) => {
      if (res && res.hotels) {
        this.hotels = res.hotels;
      } else {
        this.hotels = [];
      }
    }, error => {
      console.error("Erreur lors du filtrage :", error);
    });
  }

  resetFilters() {
    this.filters = {
      nom: '',
      ville: '',
      nbre_etoiles: ''
    };
    this.loadHotels();
  }

}
