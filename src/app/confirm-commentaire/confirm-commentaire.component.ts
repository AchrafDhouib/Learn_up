import { Component, OnInit } from '@angular/core';
import { Commentaire } from 'src/models/Commentaire.model';
import { User } from 'src/models/User.model';
import { CommentaireService } from 'src/services/commentaire.service';

@Component({
  selector: 'app-confirm-commentaire',
  templateUrl: './confirm-commentaire.component.html',
  styleUrls: ['./confirm-commentaire.component.css']
})
export class ConfirmCommentaireComponent implements OnInit {
  commentaires: Commentaire[] = [];
  searchText: string = '';  // Variable pour la recherche



  constructor(private commentaireService: CommentaireService) {}

  ngOnInit(): void {
    this.getAllCommentaires();
  }

  getAllCommentaires(): void {
    this.commentaireService.getAllCommentaires().subscribe(
      (data) => {
        console.log(data); 
        this.commentaires = data.commentaires ?? data; // supporte les deux formats (array ou {commentaires: array})
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    );
  }

  changerStatut(commentaireId: number, action: 'confirmer' | 'rejeter'): void {
    if (action === 'confirmer') {
      this.commentaireService.confirmerCommentaire(commentaireId).subscribe(() => {
        this.getAllCommentaires(); // appel corrigé ici
      });
    } else if (action === 'rejeter') {
      this.commentaireService.rejeterCommentaire(commentaireId).subscribe(() => {
        this.getAllCommentaires(); // appel corrigé ici aussi
      });
    }
  }


  getStatusStyle(status: string): any {
    switch (status) {
      case 'publie':
        return { backgroundColor: '#009e00', color: 'white' };
      case 'en_attente':
        return { backgroundColor: '#9b9b9b', color: '#212529' };
      case 'rejete':
        return { backgroundColor: '#bf0000', color: 'white' };
      default:
        return { backgroundColor: '#5c0000', color: 'white' }; // gris pour statut inconnu
    }
  }
}

  

  
