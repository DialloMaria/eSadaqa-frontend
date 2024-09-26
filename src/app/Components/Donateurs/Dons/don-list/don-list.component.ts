import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { DonModel } from '../../../../Models/Don.model';
import { DonService } from './../../../../Services/don.Services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-don-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './don-list.component.html',
  styleUrl: './don-list.component.css'
})
export class DonListComponent implements OnInit {
  dons: DonModel[] = [];

  constructor(private DonService: DonService, private router: Router) {}

  ngOnInit(): void {
    this.getAllDons();
  }

  getAllDons(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
        this.DonService.getDons().subscribe(
            (response: any) => { // Change le type en 'any' temporairement
                console.log('Dons récupérés:', response);
                if (Array.isArray(response.data)) {
                    this.dons = response.data; // Accède au tableau
                } else {
                    console.error('Erreur: les dons récupérés ne sont pas un tableau', response.data);
                    this.dons = []; // Assure-toi que dons est un tableau
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
}


