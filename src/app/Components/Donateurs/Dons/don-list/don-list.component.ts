import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { DonModel } from '../../../../Models/Don.model';
import { DonService } from './../../../../Services/don.Services';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

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
            alert('Session expirée. Veuillez vous reconnecter.');
            this.router.navigate(['/connexion']);
          } else {
            console.error('Erreur lors de la récupération des dons:', error);
          }
        }
      );
    } else {
      alert('Vous devez être connecté pour voir cette page.');
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
  const token = localStorage.getItem('access_token'); // Utilisation cohérente de 'access_token'
  if (id !== undefined && token) {
    this.DonService.deleteDon(id).subscribe(
      () => {
        this.getAllDons(); // Recharge la liste après la suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression du don:', error);
      }
    );
  } else {
    console.error('Token non trouvé ou ID invalide.');
  }
}



// openAddDonDialog(): void {
//   const dialogRef = this.dialog.open(DonModalComponent, {
//     width: '400px',
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       // Optionnel : Rafraîchir la liste des dons après ajout
//     }
//   });
// }
}


