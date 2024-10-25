import { Component, OnInit } from '@angular/core';
import { RapportService } from '../../../Services/rapport.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationsBeneficiaireComponent } from "../notifications/notifications.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DonModel } from '../../../Models/Don.model';
import { ReservationService } from '../../../Services/reservation.Service';
import { AuthService } from '../../../Services/auth.Service';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [CommonModule, NotificationsBeneficiaireComponent , ReactiveFormsModule],
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent implements OnInit {
  reservationId!: number; // ID de réservation
  rapportContenu: string = ''; // Contenu du rapport
  errorMessage: string = ''; // Message d'erreur
  reservationForm: FormGroup;
  beneficiaires: any[] = [];
  token: string = "";
  dons: DonModel[] = [];
  donId!: number;
  reservations: any[] = [];
  don:any[] = [];
  donateurId: number | null = null;
reservation: any;


  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private rapportService: RapportService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService : NotificationService

  ) {
    this.reservationForm = this.fb.group({
      description: ['', Validators.required],
      beneficiaire_id: ['', Validators.required]
    });
      // Récupérer l'ID de la réservation depuis l'URL
    this.route.params.subscribe(params => {
      this.reservationId = 103;
    });
  }



  ngOnInit(): void {
    console.log('ID du don reçu depuis le parent:', this.donId);
    // Charger les bénéficiaires et les dons
    this.loadBeneficiaires();
    this.fetchReservations();
    this.donateurId = this.authService.getDonateurId();

  }
  loadBeneficiaires(): void {
    this.reservationService.getBeneficiaires().subscribe({
      next: (data) => {
        console.log('Données reçues:', data);
        if (data.success) {
          this.beneficiaires = Array.isArray(data.beneficiaires) ? data.beneficiaires : [];
          console.log('Bénéficiaires:', this.beneficiaires); // Vérifiez les bénéficiaires
        } else {
          console.error('Aucun bénéficiaire trouvé dans la réponse');
        }
      },
      error: (err) => console.error('Erreur lors du chargement des bénéficiaires:', err)
    });
  }

  fetchReservations(): void {
    this.notificationService.getReservationByBeneficiare().subscribe({
      next: (data) => {
        // Filter out confirmed reservations from the fetched data
        this.reservations = data.filter((reservation: any) => reservation.don.status == 'confirme');
        console.log('Réservations:', this.reservations);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réservations:', error);
      },
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
