import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormGroup } from '@angular/forms';
import { DonFormComponent } from '../../Donateurs/Dons/don-form/don-form.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ReservationComponent } from '../../Organisations/Reservations/reservation/reservation.component';
import { DonModel } from '../../../Models/Don.model';
import { DonService } from '../../../Services/don.Services';
import { AuthService } from '../../../Services/auth.Service';
import { AdminComponent } from "../admin/admin.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProduitModel } from '../../../Models/TypeProduit.model';
import { Chart } from 'chart.js';
import { ProduitService } from '../../../Services/produit.Service';


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
    AdminComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    BsDatepickerModule,
  ],
  templateUrl: './list-don.component.html',
  styleUrl: './list-don.component.css'
})
export class ListDonComponent implements OnInit {
  dons: DonModel[] = [];
  filteredDons: DonModel[] = [];
  userId!: number; // ID de l'utilisateur connecté
  prenom!: string; // ID de l'utilisateur connecté
  nombreDonsUtilisateur: number = 0;
  page: number = 1;
  reservationForm!: FormGroup;
  selectedDonId: number | null = null;
  selectedDate: Date = new Date(); // Date sélectionnée par l'utilisateur
  errorMessage: string = '';
  chart: any;
  quantite!: number;

  // Déclarez un EventEmitter pour envoyer l'ID du don au parent
  @Output() reserveDon = new EventEmitter<number>();

  constructor(private DonService: DonService, private router: Router, private dialog: MatDialog, authService: AuthService,private ProduitServices:ProduitService) { }

  ngOnInit(): void {
    this.getAllDons();
    this.getUserId(); // Récupérer l'utilisateur connecté

    // this.getDonsByDate(this.formatDate(this.selectedDate));
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
      this.userRole = user.roles[0].name || ''; // Récupérer le nom du rôle
    } else {
      this.userRole = '';
    }

    console.log("Rôle de l'utilisateur connecté : ", this.userRole); // Vérifier le rôle dans la console
  }

  // Vérifier si l'utilisateur est une organisation
  isOrganisation(): boolean {
    return this.userRole === 'organisation'; // Adapter selon votre gestion des rôles
  }




  // Récupérer tous les dons et calculer le nombre de dons de l'utilisateur connecté
  getAllDons(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.DonService.getDons().subscribe(
        (response: any) => {
          if (Array.isArray(response.data)) {
            this.dons = response.data;
            console.log('dons:', this.dons);
            this.dons.forEach((dons: DonModel) => {
              dons.image = dons.image ? `http://127.0.0.1:8000/storage/${dons.image}` : 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid';

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
          cancelButton: 'btn-annuler', // Ajoutez votre classe pour le bouton d'annulation
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


  // Fonction pour récupérer les dons en fonction de la date
  // Fonction pour récupérer les dons en fonction de la date
  // Fonction pour récupérer les dons à une date donnée
  getDonsByDate(date: string): void {
    this.DonService.getDonsByDate(date).subscribe(
      (response) => {
        this.dons = response.data;
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des dons.';
        console.error(error);
      }
    );
  }

  // Quand l'utilisateur sélectionne une nouvelle date
  onDateSelect(event: Date): void {
    //   this.selectedDate = event;
    //   const formattedDate = this.formatDate(event);
    //   this.getDonsByDate(formattedDate);
    // }
    // Formater la date en 'yyyy-MM-dd' pour l'API
    // formatDate(date: Date): string {
    //   const year = date.getFullYear();
    //   const month = ('0' + (date.getMonth() + 1)).slice(-2);
    //   const day = ('0' + date.getDate()).slice(-2);
    //   return `${year}-${month}-${day}`;
    // }
    // Envoyer l'ID du don lorsqu'on clique sur "Réserver"
    //     reserverDon(donId: any): void {
    //   this.reserveDon.emit(donId); // Émet l'événement vers le parent
    // }
  }


  getEvolutionProduit(): void {
    this.ProduitServices.getEvolutionProduit()
      .subscribe((data: ProduitModel[]) => {
        const nomProduit = data.map(item => item.libelle); // Extraction des noms des produits
        const quantiteProduit = data.map(item => item.quantite); // Extraction des quantités fournies
        console.log('Données reçues du serveur:', data);

        // Vérifiez ici les valeurs undefined dans les quantités
        const undefinedQuantities = quantiteProduit.filter(value => value === undefined || value === null);
        if (undefinedQuantities.length > 0) {
          console.warn('Certaines quantités sont undefined ou null:', undefinedQuantities);
        }

        const filteredQuantiteProduit = quantiteProduit.filter((value): value is number => value !== undefined && value !== null);

        console.log('Produits:', nomProduit);
        console.log('Quantité filtrée:', filteredQuantiteProduit);

        this.createBarChart(nomProduit, filteredQuantiteProduit); // Création du graphique
      });
  }

  createBarChart(nomProduit: string[], filteredQuantiteProduit: number[]) {
    this.chart = new Chart('productChart', {
      type: 'bar', // Type du graphique: barres
      data: {
        labels: nomProduit, // Noms des produits comme étiquettes
        datasets: [{
          label: 'Quantité de Produits Fournis',
          data: filteredQuantiteProduit, // Quantités fournies des produits
          backgroundColor: '#ff6137', // Couleur des barres
          borderColor: '#ce0033', // Couleur de la bordure des barres
          borderWidth: 1 // Épaisseur de la bordure
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permet de personnaliser les dimensions du graphique
        scales: {
          y: {
            beginAtZero: true // Commencer l'axe Y à zéro
          }
        }
      }
    });
  }
}
