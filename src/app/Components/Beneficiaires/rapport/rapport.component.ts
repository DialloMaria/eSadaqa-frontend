import { ReservationModel } from './../../../Models/Resevation.model';
import { Component, OnInit } from '@angular/core';
import { RapportService } from '../../../Services/rapport.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [CommonModule, NotificationsBeneficiaireComponent , ReactiveFormsModule, RouterLink],
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
reservation: ReservationModel[] = [];
userId!: number; // ID de l'utilisateur connecté
prenom!: string; // ID de l'utilisateur connecté
photo_profile!: string; // ID de l'utilisateur connecté
userRole!: string;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private rapportService: RapportService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService : NotificationService,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      description: ['', Validators.required],
      beneficiaire_id: ['', Validators.required]
    });

  }



  ngOnInit(): void {
    console.log('ID du don reçu depuis le parent:', this.donId);
    // Charger les bénéficiaires et les dons
    this.loadReservations();
    this.donateurId = this.authService.getDonateurId();
    this.getUserId(); // Récupérer l'utilisateur connecté


  }
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

  loadReservations(): void {
    this.reservationService.getReservationByBeneficiare().subscribe(
      (response) => {
        this.reservations = response.reservations; // Assurez-vous de la structure des données
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des réservations';
        console.error(error);
      }
    );
  }



  // Méthode pour générer le rapport
  generateRapport(reservationId:any) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.errorMessage = 'Token d\'accès manquant.';
      return;
    }

    this.rapportService.generateRapport(reservationId).subscribe(
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
// Méthode pour afficher les alertes avec SweetAlert2 avec fermeture automatique après 3 secondes
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


  }
