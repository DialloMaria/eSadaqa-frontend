import { ReservationModel } from './../../../Models/Resevation.model';
import { Component, OnInit } from '@angular/core';
import { RapportService } from '../../../Services/rapport.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationsBeneficiaireComponent } from "../notifications/notifications.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DonModel } from '../../../Models/Don.model';
import { ReservationService } from '../../../Services/reservation.Service';
import { AuthService } from '../../../Services/auth.Service';
import { NotificationService } from '../../../Services/notification.service';
import Swal from 'sweetalert2';
import { BeneficiaireService } from '../../../Services/beneficiaire.Service';

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
nombreDonsUtilisateur: number = 0;


  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private rapportService: RapportService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService : NotificationService,
    private router: Router,
    private beneficiaireService:BeneficiaireService

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
this.getAllDons();

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


  // Récupérer tous les dons et calculer le nombre de dons de l'utilisateur connecté

  // Récupérer tous les dons et calculer le nombre de dons de l'utilisateur connecté
  getAllDons(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.beneficiaireService.getDonsByBeneficiaire().subscribe(
        (response: any) => {
          if (Array.isArray(response.dons)) {
            this.dons = response.dons;
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



  // getAllDons(): void {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     this.beneficiaireService.getDonsByBeneficiaire().subscribe(
  //       (response: any) => {
  //         // Vérifie si response.dons est bien un tableau
  //         if (Array.isArray(response.dons)) {
  //           this.dons = response.dons; // Met à jour this.dons avec les données correctes
  //           console.log('dons:', this.dons);

  //           // Ajoute le chemin de l'image pour chaque don
  //           this.dons.forEach((don: DonModel) => {
  //             don.image = don.image
  //               ? `http://127.0.0.1:8000/storage/${don.image}`
  //               : 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid';
  //           });

  //           this.getNombreDonsUtilisateur();
  //         }

  //         console.log('API response:', response);

  //       },
  //       (error) => {
  //         if (error.status === 401) {
  //           this.showAlert('Erreur', 'Session expirée. Veuillez vous reconnecter.', 'error');
  //           this.router.navigate(['/connexion']);
  //         } else {
  //           console.error('Erreur lors de la récupération des dons:', error);
  //         }
  //       }
  //     );
  //   } else {
  //     this.showAlert('Erreur', 'Vous devez être connecté pour voir cette page.', 'error');
  //     this.router.navigate(['/connexion']);
  //   }
  // }


  getNombreDonsUtilisateur(): void {
    this.nombreDonsUtilisateur = this.dons.filter(don => don.created_by === this.userId).length;
  }
  // Vérifier si l'utilisateur connecté est celui qui a créé le don
isDonCreator(createdBy: number): boolean {
  return this.userId === createdBy;
}

logout(): void {
  const token = localStorage.getItem('access_token');
  if (token) {
    // Suppression des informations d'authentification
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    // Redirection vers la page de connexion
    this.router.navigateByUrl('/connexion');
  } else {
    console.error('Token non trouvé.');
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
