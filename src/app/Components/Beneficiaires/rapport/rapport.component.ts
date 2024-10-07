import { Component } from '@angular/core';
import { RapportService } from '../../../Services/rapport.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent {
  reservationId!: number; // ID de réservation
  rapportContenu: string = ''; // Contenu du rapport
  errorMessage: string = ''; // Message d'erreur

  constructor(
    private rapportService: RapportService,
    private route: ActivatedRoute
  ) {
    // Récupérer l'ID de la réservation depuis l'URL
    this.route.params.subscribe(params => {
      this.reservationId = 45;
    });
  }

  // Méthode pour générer le rapport
  generateRapport() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.errorMessage = 'Token d\'accès manquant.';
      return;
    }


    this.rapportService.generateRapport(this.reservationId).subscribe(
      (response) => {
        console.log('Réponse reçue :', response);
        if (response.success) {
          this.rapportContenu = response;
          this.errorMessage = '';
        } else {
          this.errorMessage = response.rapport.contenu || 'Erreur inconnue.';
        }
      },
      (error) => {
        console.error('Erreur API :', error);
        this.errorMessage = 'Erreur lors de la génération du rapport.';
        this.rapportContenu = '';
      }
    );
  }




  }
