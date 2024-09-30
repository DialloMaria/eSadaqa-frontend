import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { DonModel } from '../../../../Models/Don.model';
import { DonService } from './../../../../Services/don.Services';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-don-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './don-list.component.html',
  styleUrl: './don-list.component.css'
})
export class DonListComponent implements OnInit {
  dons: DonModel[] = [];
  userId!: number; // ID de l'utilisateur connecté
  nombreDonsUtilisateur: number = 0;

  constructor(private DonService: DonService, private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllDons();
    this.getUserId(); // Récupérer l'utilisateur connecté

  }
  // Méthode pour récupérer l'ID de l'utilisateur connecté depuis le token ou session
  getUserId(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user?.id || 0; // Récupérer l'ID de l'utilisateur connecté
    this.getAllDons();  }

  // Récupérer tous les dons et calculer le nombre de dons de l'utilisateur connecté
  getAllDons(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.DonService.getDons().subscribe(
        (response: any) => {
          if (Array.isArray(response.data)) {
            this.dons = response.data;
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
      customClass: {
        confirmButton: 'btn-supprimer', // Ajoutez votre classe pour le bouton de confirmation
        cancelButton: 'btn-annuler', // Ajoutez votre classe pour le bouton de confirmation
      }
    });
  }


}


