import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ReservationComponent } from '../Reservations/reservation/reservation.component';
import { DonModel } from '../../../Models/Don.model';
import { DonService } from '../../../Services/don.Services';
import { AuthService } from '../../../Services/auth.Service';

@Component({
  selector: 'app-listDonConfirmer',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReservationComponent
],
  templateUrl: './list-don-reservation.component.html',
  styleUrl: './don-list.component.css'
})
export class ListDonCOnfirmerComponent implements OnInit {
  dons: DonModel[] = [];
  userId!: number; // ID de l'utilisateur connecté
  prenom!: string; // ID de l'utilisateur connecté
  nombreDonsUtilisateur: number = 0;
  page: number = 1;
  selectedDonId: number | null = null;

// Déclarez un EventEmitter pour envoyer l'ID du don au parent

  constructor(private DonService: DonService, private router: Router,private dialog: MatDialog, authService: AuthService) {}

  ngOnInit(): void {
    this.getDonsConfirmerForOrganisation();
    this.getUserId(); // Récupérer l'utilisateur connecté

  }
    userRole!: string;
  // Méthode pour récupérer l'ID de l'utilisateur connecté depuis le token ou session
  getUserId(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log("Utilisateur connecté : ", user);

    this.userId = user?.id || 0;
    this.prenom = user?.prenom || '';

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

  // Récupérer tous les dons et calculer le nombre de dons de l'utilisateur connecté
  getDonsConfirmerForOrganisation(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.DonService.getDonsConfirmerForOrganisation().subscribe(
        (response: any) => {
          if (Array.isArray(response.data)) {
            this.dons = response.data;
            console.log('dons:', this.dons);
            this.dons.forEach((dons: DonModel) => {
              dons.image = dons.image ? `http://127.0.0.1:8000/storage/${dons.image}` : 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid',
              dons.id = dons.id
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
              this.getDonsConfirmerForOrganisation(); // Recharge la liste après la suppression
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
      customClass: {
        confirmButton: 'btn-supprimer', // Ajoutez votre classe pour le bouton de confirmation
        cancelButton: 'btn-annuler', // Ajoutez votre classe pour le bouton de confirmation
      }
    });
  }
  // // Méthode pour afficher les détails d'un don
  voirDetails(don: any): void {
    console.log('Voir les détails du don:', don);
    // Implémentez la logique pour afficher plus de détails (par exemple, dans un autre modal)
  }

    // Méthode pour réserver un don
    reserverDon(donId: number): void {
      this.selectedDonId = donId; // Stocker l'ID du don sélectionné
      console.log('Don ID sélectionné:', donId);
    }

  }
