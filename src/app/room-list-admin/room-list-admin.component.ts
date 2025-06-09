import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from 'src/services/rooms.service';
declare var bootstrap: any;


@Component({
  selector: 'app-room-list-admin',
  templateUrl: './room-list-admin.component.html',
  styleUrls: ['./room-list-admin.component.css']
})
export class RoomListAdminComponent implements  OnInit {
  chambres: any[] = [];
  filteredChambres: any[] = [];
  chambreTypes: string[] = [];
  selectedType: string = '';
  selectedAvailability: string | null = null;
  hotelId!: number;
  hotelName: string = '';
  newRoom: any = {};
  editMode: boolean = false;
  editedRoomId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private roomsService: RoomsService
  ) {}

  ngOnInit(): void {
    const storedHotelId = localStorage.getItem('hotelId');
    if (storedHotelId) {
      this.hotelId = +storedHotelId;
      console.log('Hotel ID chargé depuis le localStorage :', this.hotelId);
      this.loadHotelRooms();
    } else {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.hotelId = +idParam;
        console.log('Hotel ID chargé depuis l\'URL :', this.hotelId);
        localStorage.setItem('hotelId', this.hotelId.toString());
        this.loadHotelRooms();
      } else {
        console.error("Aucun ID d’hôtel fourni dans l’URL.");
      }
    }
  }
  

  loadHotelRooms() {
    this.roomsService.getHotelWithRooms(this.hotelId).subscribe({
      next: (response) => {
        if (response.success && response.hotel) {
          this.hotelName = response.hotel.nom;
          this.chambres = response.hotel.chambres;
          this.chambreTypes = [...new Set(this.chambres.map(c => c.type_chambre))];
          this.selectedType = this.chambreTypes[0];
          this.filterRooms();
        } else {
          console.error("Réponse de l'API invalide : ", response);
        }
      },
      error: (err) => {
        console.error('Erreur de chargement des chambres de l’hôtel', err);
        alert('Une erreur est survenue lors du chargement des données de l\'hôtel.');
      }
    });
  }
  

filterRooms() {
  this.filteredChambres = this.chambres.filter(c => {
    const typeMatch = this.selectedType ? c.type_chambre === this.selectedType : true;
    const availabilityMatch = this.selectedAvailability !== null ? c.disponibilite === this.selectedAvailability : true;
    return typeMatch && availabilityMatch;
  });
}


  onChangeType(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
    this.filterRooms();
  }

  onChangeAvailability(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedAvailability = selectElement.value !== '' ? selectElement.value : null;
    this.filterRooms();
  }
  

  getStars(count: number): any[] {
    return Array(count).fill(0);
  }

  openModalForAdd() {
    // Ouvrir la modale pour l'ajout d'une chambre
    this.editMode = false;
    this.resetForm();
    const modal = document.getElementById('roomModal');
    if (modal) {
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    }
  }

  saveRoom() {
    // Enregistrer ou mettre à jour une chambre
    console.log("Enregistrer la chambre:", this.newRoom); // Pour déboguer
    if (this.editMode && this.editedRoomId !== null) {
      this.newRoom.hotel_id = this.hotelId;
      this.roomsService.updateRoom(this.editedRoomId, this.newRoom).subscribe(() => {
        console.log("Chambre mise à jour");
        this.loadHotelRooms();
        this.resetForm();
      });
    } else {
      this.newRoom.hotel_id = this.hotelId;
      this.roomsService.addRoom(this.newRoom).subscribe(() => {
        console.log("Chambre ajoutée");
        this.loadHotelRooms();
        this.resetForm();
      });
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('roomModal')!);
    modal?.hide();
  }

  editRoom(chambre: any) {
    // Ouvrir la modale pour modifier une chambre
    this.editMode = true;
    this.editedRoomId = chambre.id;
    this.newRoom = { ...chambre };
    const modal = document.getElementById('roomModal');
    if (modal) {
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    }
  }

  deleteRoom(id: number) {
    // Supprimer une chambre
    this.roomsService.deleteRoom(id).subscribe(() => {
      this.loadHotelRooms();
    });
  }

  resetForm() {
    // Réinitialiser le formulaire
    this.newRoom = {};
    this.editMode = false;
    this.editedRoomId = null;
  }

  getTypeColor(type: string): string {
    // Retourner la couleur en fonction du type de chambre
    switch(type.toLowerCase()) {
      case 'single': return 'single';
      case 'double': return 'double';
      case 'suite': return 'suite';
      case 'deluxe': return 'deluxe';
      default: return 'primary';
    }
  }
}