import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { DonModel } from '../../../../Models/Don.model';
import { DonService } from './../../../../Services/don.Services';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DonFormComponent } from "../don-form/don-form.component";
import { AuthService } from '../../../../Services/auth.Service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormGroup } from '@angular/forms';
import { ReservationComponent } from '../../../Organisations/Reservations/reservation/reservation.component';
import { NotificationsComponent } from "../../../notifications/notifications.component";
import { PaginationComponent } from '../../../pagination/pagination.component';

@Component({
  selector: 'app-don-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    DonFormComponent,
    ReservationComponent,
    NgxPaginationModule,
    NotificationsComponent,
    PaginationComponent
],
  templateUrl: './don-list.component.html',
  styleUrl: './don-list.component.css'
})
export class DonListComponent implements OnInit {
  dons: DonModel[] = [];
  userId!: number; // ID de l'utilisateur connecté
  prenom!: string; // ID de l'utilisateur connecté
  photo_profile!: string; // ID de l'utilisateur connecté
  nombreDonsUtilisateur: number = 0;
  page: number = 1;
  reservationForm!:FormGroup;
  selectedDonId: number | null = null;
  length= [];
  reservations: any[] = [];
  don:any[] = [];
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 6; // Nombre de cartes par page
  paginatedDons: any[] = []; // Tableau des dons paginés
  totalPages : number = 10;

// Déclarez un EventEmitter pour envoyer l'ID du don au parent
@Output() reserveDon = new EventEmitter<number>();

  constructor(private DonService: DonService, private router: Router,private dialog: MatDialog, authsercie: AuthService) {
    this.dons = this.getDummyDons();
  }

  ngOnInit(): void {
    // Remplacez par la méthode pour récupérer vos dons
    // Initialisation de la pagination
    this.updatePaginatedDons();
    this.getAllDons();
    this.getUserId(); // Récupérer l'utilisateur connecté

  }

  userRole!: string;
  // Méthode pour récupérer l'ID de l'utilisateur connecté depuis le token ou session
  getUserId(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log("Utilisateur connecté : ", user);

    this.userId = user?.id || 0;
    this.prenom = user?.prenom || '';
    this.photo_profile = user?.photo_profile || '';  // Récupérer la photo de profil de l'utilisateur connecté

    // Vérification du rôle dans le tableau 'roles'
    if (user?.roles && user.roles.length > 0) {
      this.userRole = user.roles[0].name || '';  // Récupérer le nom du rôle
    } else {
      this.userRole = '';
    }

    console.log("Rôle de l'utilisateur connecté : ", this.userRole);  // Vérifier le rôle dans la console
  }

    // Vérifier si l'utilisateur est une organisation
    isOrganisation(): boolean {
      return this.userRole === 'organisation'; // Adapter selon votre gestion des rôles
    }


    get unconfirmedReservationsCount(): number {
      return this.reservations.filter(reservation => reservation.don.status !== 'confirme').length;
    }

    getDummyDons(): any[] {
      return Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        libelle: `Don ${i + 1}`,
        description: `Description du don ${i + 1}`,
        image: 'https://via.placeholder.com/300',
        created_by: null // Remplace par la vraie logique
      }));
    }

  // Récupérer tous les dons et calculer le nombre de dons de l'utilisateur connecté
  getAllDons(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.DonService.getDons().subscribe(
        (response: any) => {
          if (Array.isArray(response.data)) {
            // this.dons = response.data;
            this.dons = response.data.filter((don: DonModel) => don.created_by === this.userId); // Filtrer les dons
            this.nombreDonsUtilisateur = this.dons.length; // Nombre de dons créés par l'utilisateur
            console.log('dons:', this.dons);
            this.dons.forEach((dons: DonModel) => {
              dons.image = dons.image ? `http://127.0.0.1:8000/storage/${dons.image}` : 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid'
            });

            this.getNombreDonsUtilisateur();
          }

        },
        (error) => {
          if (error.status === 401) {
            this.showAlert('Erreur', 'Session expirée. Veuillez vous reconnecter.', 'error');
            this.router.navigate(['/connexion']);
          } else {
            console.error('Erreur lors de la récupération des dons:', error);
          }
        }
      );
    } else {
      this.showAlert('Erreur', 'Vous devez être connecté pour voir cette page.', 'error');
      this.router.navigate(['/connexion']);
    }
  }
  // Filtrer les dons par utilisateur connecté
  // Calculer le nombre de dons créés par l'utilisateur connecté
  getNombreDonsUtilisateur(): void {
    this.nombreDonsUtilisateur = this.dons.filter(don => don.created_by === this.userId).length;
  }
// Vérifier si l'utilisateur connecté est celui qui a créé le don
isDonCreator(createdBy: number): boolean {
  return this.userId === createdBy;
}



   // Supprime un don

   deleteDon(id?: number): void {
    const token = localStorage.getItem('access_token');
    if (id !== undefined && token) {
      // Afficher une boîte de dialogue de confirmation
        Swal.fire({
          title: 'Confirmation',
          text: 'Êtes-vous sûr de vouloir supprimer ce don ?',
          icon: 'warning',
          imageWidth: 56,
          imageHeight: 56,
          showCancelButton: true,
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Non, annuler',
          customClass: {
            confirmButton: 'btn-supprimer', // Ajoutez votre classe pour le bouton de confirmation
            cancelButton: 'btn-annuler',   // Ajoutez votre classe pour le bouton d'annulation
          }
        }).then((result) => {
        if (result.isConfirmed) {
          // L'utilisateur a confirmé la suppression
          this.DonService.deleteDon(id).subscribe(
            () => {
              this.showAlert('Succès', 'Le don a été supprimé avec succès.', 'success');
              this.getAllDons(); // Recharge la liste après la suppression
            },
            (error) => {
              console.error('Erreur lors de la suppression du don:', error);
              this.showAlert('Erreur', 'Une erreur est survenue lors de la suppression du don.', 'error');
            }
          );
        }
      });
    } else {
      console.error('Token non trouvé ou ID invalide.');
      this.showAlert('Erreur', 'Token non trouvé ou ID invalide.', 'error');
    }
  }

  // Méthode pour afficher les alertes avec SweetAlert2
  showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question'): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
      timer: 2500, // Fermer automatiquement après 3 secondes (3000 millisecondes)
      timerProgressBar: true, // Afficher une barre de progression
      customClass: {
        confirmButton: 'btn-supprimer', // Classe CSS pour personnaliser le bouton de confirmation
        cancelButton: 'btn-annuler'     // Classe CSS pour personnaliser le bouton d'annulation
      }
    });
  }
  // // Méthode pour afficher les détails d'un don
  voirDetails(don: any): void {
    console.log('Voir les détails du don:', don);
    // Implémentez la logique pour afficher plus de détails (par exemple, dans un autre modal)
  }

  // Méthode pour réserver un don
  // reserverDon(id: number) {
  //   this.selectedDonId = id;
  //   console.log('Réserver ce don:', id);
  //   // Montrez le modal ici si ce n'est pas fait automatiquement par Bootstrap
  // }
    // Méthode pour réserver un don
    reserverDon(donId: number): void {
      this.selectedDonId = donId; // Stocker l'ID du don sélectionné
      console.log('Don ID sélectionné:', this.selectedDonId);
    }

      // Envoyer l'ID du don lorsqu'on clique sur "Réserver"
  //     reserverDon(donId: any): void {
  //   this.reserveDon.emit(donId); // Émet l'événement vers le parent
  // }




  updatePaginatedDons(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDons = this.dons.slice(startIndex, endIndex);

    console.log('Current Page:', this.currentPage); // Debug: Vérifie la page actuelle
    console.log('Paginated Dons:', this.paginatedDons); // Debug: Vérifie les dons affichés
  }

  changePage(page: number): void {
    if (page < 1 || page > this.getTotalPages()) return; // Limite de pages
    this.currentPage = page;
    this.updatePaginatedDons(); // Met à jour les dons affichés
  }

  getTotalPages(): number {
    return Math.ceil(this.dons.length / this.itemsPerPage); // Nombre total de pages
  }

  logout(): void {
    const token = localStorage.getItem('access_token');

    if (token) {
      // Afficher une boîte de dialogue de confirmation
      Swal.fire({
        title: 'Confirmation',
        text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, déconnectez-moi',
        cancelButtonText: 'Non, annuler',
        customClass: {
          confirmButton: 'btn-supprimer', // Classe CSS pour personnaliser le bouton de confirmation
          cancelButton: 'btn-annuler'     // Classe CSS pour personnaliser le bouton d'annulation
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // L'utilisateur a confirmé la déconnexion
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');

          // Afficher une alerte de déconnexion réussie
          this.showAlert('Déconnexion réussie', 'Vous avez été déconnecté avec succès.', 'success');
          this.router.navigateByUrl('/connexion'); // Redirige vers la page de connexion
        }
      });
    } else {
      console.error('Token non trouvé.');
      this.showAlert('Erreur', 'Token non trouvé.', 'error');
    }
  }

  // Méthode pour afficher les alertes avec SweetAlert2
  showAlertD(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question'): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn-supprimer', // Classe CSS pour personnaliser le bouton de confirmation
        cancelButton: 'btn-annuler'     // Classe CSS pour personnaliser le bouton d'annulation
      }
    });
  }


}




