import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/services/auth-service.service';
// import { CommentaireService } from 'src/services/commentaire.service';
import { Commentaire } from 'src/models/Commentaire.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  userName: string | null = '';
  commentaires: Commentaire[] = [];
  

  @ViewChild('heroSection') heroSectionRef!: ElementRef;

  constructor(
    public authService: AuthServiceService,
    // private commentaireService: CommentaireService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.userName = status ? this.authService.getUserName() : null;
      console.log('Utilisateur connecté :', this.userName);  // Vérifie l'utilisateur

      // this.loadCommentaires();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const section = this.heroSectionRef?.nativeElement;
      if (section) {
        section.classList.add('visible');
      } else {
        console.warn('heroSection non trouvé dans le DOM.');
      }
    });
  }


  // loadCommentaires(): void {
  //   console.log('Chargement des commentaires...');

  //   this.commentaireService.getAllCommentaires().subscribe({
  //     next: (data: any) => { // Utilisez 'any' temporairement pour debug
  //       console.log('Structure des données reçues:', data);

  //       // Vérifiez si data est un tableau ou contient un tableau
  //       if (Array.isArray(data)) {
  //         this.commentaires = [...data];
  //       } else if (data && Array.isArray(data.commentaires)) {
  //         // Si l'API retourne un objet avec une propriété 'commentaires'
  //         this.commentaires = [...data.commentaires];
  //       } else {
  //         console.error('Format de données inattendu:', data);
  //         this.commentaires = [];
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors du chargement des commentaires', err);
  //       }
  //   });
  // }
}
