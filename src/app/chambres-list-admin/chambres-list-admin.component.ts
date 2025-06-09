import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelsService } from 'src/services/hotels.service';
import { RoomsService } from 'src/services/rooms.service';
declare var bootstrap: any;


@Component({
  selector: 'app-chambres-list-admin',
  templateUrl: './chambres-list-admin.component.html',
  styleUrls: ['./chambres-list-admin.component.css']
})
export class ChambresListAdminComponent implements OnInit {
  hotelId!: number;
  chambres: any[] = [];
  hotelNom: string = '';

  newRoom: any = {};
  editMode: boolean = false;
  editedRoomId: number | null = null;
  chambreTypes: string[] = [];
  filteredChambres: any[] = [];



  constructor(
    private route: ActivatedRoute,
    private hotelsService: HotelsService,
     private roomsService: RoomsService
    
  ) {}

  ngOnInit(): void {
    this.hotelId = +this.route.snapshot.paramMap.get('id')!;
    this.loadChambres();
    this.loadHotelNom();
  }

  loadChambres() {
    this.hotelsService.getChambresByHotelId(this.hotelId).subscribe({
      next: (data) => {
        // Adapte ici si ton backend retourne un tableau directement
        this.chambres = data.chambres ?? data;
        this.chambreTypes = [...new Set(this.chambres.map(c => c.type_chambre))];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des chambres :', err);
      }
    });
  }

  loadHotelNom() {
    this.hotelsService.getHotelById(this.hotelId).subscribe({
      next: (response) => {
        // La réponse contient un objet `hotel` dans l'attribut `hotel`
        this.hotelNom = response.hotel.nom; // Accéder à `hotel.nom`
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du nom de l\'hôtel :', err);
      }
    });
  }
  saveRoom() {
    this.newRoom.hotel_id = this.hotelId;  // Ajouter l'ID de l'hôtel
  
    if (this.editMode) {
      // Mettre à jour la chambre
      this.roomsService.updateRoom(this.editedRoomId!, this.newRoom).subscribe({
        next: (response) => {
          // Fermer la modale après la mise à jour
          const modal = document.getElementById('roomModal');
          if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
          }
          
          // Mettre à jour la chambre dans la liste des chambres
          const index = this.chambres.findIndex(c => c.id === this.editedRoomId);
          if (index !== -1) {
            this.chambres[index] = response.room;  // Remplacer la chambre modifiée
          }
  
          this.resetForm();
          console.log('Chambre modifiée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la modification de la chambre :', err);
        }
      });
    } else {
      // Ajouter une nouvelle chambre
      this.roomsService.addRoom(this.newRoom).subscribe({
        next: (response) => {
          const modal = document.getElementById('roomModal');
          if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
          }
  
          this.chambres.push(response.room);
          this.resetForm();
          console.log('Chambre ajoutée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de la chambre :', err);
        }
      });
    }
  }
  
  editRoom(chambre: any) {
    this.editMode = true;  // Active le mode édition
    this.editedRoomId = chambre.id;  // Sauvegarde l'ID de la chambre à modifier
    this.newRoom = { ...chambre };  // Remplir le formulaire avec les données existantes de la chambre
    const modal = document.getElementById('roomModal');
    if (modal) {
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();  // Ouvre la modale en mode édition
    }
  }

  deleteRoom(roomId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
      this.roomsService.deleteRoom(roomId).subscribe({
        next: () => {
          // Supprimer la chambre de la liste
          this.chambres = this.chambres.filter(c => c.id !== roomId);
          console.log('Chambre supprimée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la chambre :', err);
        }
      });
    }
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

  resetForm() {
    this.newRoom = {};  
    this.editMode = false;
    this.editedRoomId = null;
  }
  
  
  
}